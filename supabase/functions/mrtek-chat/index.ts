import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const AZURE_AGENT_ENDPOINT = Deno.env.get("AZURE_AGENT_ENDPOINT");
const AZURE_AGENT_API_KEY = Deno.env.get("AZURE_AGENT_API_KEY");
const AZURE_AGENT_ID = Deno.env.get("AZURE_AGENT_ID");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting: simple in-memory store (resets on function cold start)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20; // requests per window
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_WINDOW_MS });
    return true;
  }
  
  if (entry.count >= RATE_LIMIT) {
    return false;
  }
  
  entry.count++;
  return true;
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
}

// Azure AI Foundry Agent Service uses the /agents/responses endpoint
// Endpoint format: https://<host>.services.ai.azure.com/api/projects/<project>/agents/responses
async function callFoundryAgent(userInput: string, conversationHistory: ChatMessage[]): Promise<string> {
  // Build the full URL for the agents/responses endpoint
  // AZURE_AGENT_ENDPOINT should be: https://foundry-mrtek-dev.services.ai.azure.com/api/projects/MRTek-CAT-Dev
  const url = `${AZURE_AGENT_ENDPOINT}/agents/responses?api-version=2025-05-01-preview`;
  
  console.log(`Azure Foundry API call: POST ${url}`);
  console.log(`Using API key (first 10 chars): ${AZURE_AGENT_API_KEY?.substring(0, 10)}...`);
  console.log(`Using Agent ID: ${AZURE_AGENT_ID}`);

  // Build conversation context for the input
  let contextualInput = userInput;
  
  // If there's conversation history, include it for context
  if (conversationHistory.length > 1) {
    const historyContext = conversationHistory
      .slice(-6) // Last 6 messages for context
      .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');
    contextualInput = `Previous conversation:\n${historyContext}\n\nCurrent question: ${userInput}`;
  }

  // Request body for Azure AI Foundry Agent Service
  // Using the correct format for agent invocation
  const requestBody = {
    input: contextualInput,
    agent: {
      type: "agent_reference",
      name: AZURE_AGENT_ID,
      version: "1" // Default version
    },
    background: false, // Synchronous call
    store: true // Store conversation
  };

  console.log("Request body:", JSON.stringify(requestBody, null, 2));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${AZURE_AGENT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Foundry API error:", response.status, errorText);
    throw new Error(`Foundry API error: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log("Foundry response:", JSON.stringify(data, null, 2));

  // Extract the response text from the Foundry response
  // The response format may vary, so we'll handle multiple possible structures
  let responseText = "";
  
  if (typeof data.output === "string") {
    responseText = data.output;
  } else if (data.output?.text) {
    responseText = data.output.text;
  } else if (data.output?.content) {
    responseText = data.output.content;
  } else if (data.response) {
    responseText = typeof data.response === "string" ? data.response : JSON.stringify(data.response);
  } else if (data.result) {
    responseText = typeof data.result === "string" ? data.result : JSON.stringify(data.result);
  } else if (data.message) {
    responseText = data.message;
  } else {
    // Log the full response for debugging
    console.log("Unexpected response format, full data:", data);
    responseText = "I received a response but couldn't parse it. Please try again.";
  }

  return responseText;
}

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";

    if (!checkRateLimit(clientIP)) {
      return new Response(
        JSON.stringify({ 
          error: "Rate limit exceeded. Please try again later or contact michael@mrtek.ai directly." 
        }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!AZURE_AGENT_ENDPOINT || !AZURE_AGENT_API_KEY || !AZURE_AGENT_ID) {
      console.error("Azure Agent credentials not configured");
      console.error("AZURE_AGENT_ENDPOINT:", AZURE_AGENT_ENDPOINT ? "set" : "missing");
      console.error("AZURE_AGENT_API_KEY:", AZURE_AGENT_API_KEY ? "set" : "missing");
      console.error("AZURE_AGENT_ID:", AZURE_AGENT_ID ? "set" : "missing");
      return new Response(
        JSON.stringify({ error: "Service temporarily unavailable" }),
        { status: 503, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const { messages }: RequestBody = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request: messages array required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get the latest user message
    const userMessages = messages.filter(m => m.role === 'user');
    const latestUserMessage = userMessages[userMessages.length - 1];
    
    if (!latestUserMessage || !latestUserMessage.content) {
      return new Response(
        JSON.stringify({ error: "No user message provided" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize input
    const sanitizedContent = latestUserMessage.content.substring(0, 2000).trim();

    // Call the Foundry Agent
    const assistantResponse = await callFoundryAgent(sanitizedContent, messages);

    console.log("Foundry Agent response received, length:", assistantResponse.length);

    return new Response(
      JSON.stringify({ 
        response: assistantResponse
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ 
        response: "I'm having trouble connecting right now. Please try again or reach out to michael@mrtek.ai for immediate assistance." 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
