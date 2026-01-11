import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Environment variables
const AZURE_AGENT_ENDPOINT = Deno.env.get("AZURE_AGENT_ENDPOINT"); // e.g., https://foundry-mrtek-dev.services.ai.azure.com/api/projects/MRTek-CAT-Dev
const AZURE_AGENT_API_KEY = Deno.env.get("AZURE_AGENT_API_KEY");   // Foundry API key from Keys & Endpoints
const AZURE_AGENT_ID = Deno.env.get("AZURE_AGENT_ID");             // e.g., asst_T9cDMyihETMusZrgWtZ120XU
const API_VERSION = "2025-11-15-preview";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting setup
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000;

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
  conversationId?: string;
}

async function callAzureAgent(message: string, conversationId?: string): Promise<{ reply: string; conversationId?: string }> {
  // Validate required environment variables
  if (!AZURE_AGENT_ENDPOINT) {
    throw new Error("AZURE_AGENT_ENDPOINT environment variable is not set");
  }
  if (!AZURE_AGENT_API_KEY) {
    throw new Error("AZURE_AGENT_API_KEY environment variable is not set");
  }
  if (!AZURE_AGENT_ID) {
    throw new Error("AZURE_AGENT_ID environment variable is not set");
  }

  // Build the request URL - using /agents/responses endpoint
  const url = `${AZURE_AGENT_ENDPOINT}/agents/responses?api-version=${API_VERSION}`;

  // Set headers for Foundry authentication - try api-key header
  const headers: Record<string, string> = {
    "api-key": AZURE_AGENT_API_KEY!,
    "Content-Type": "application/json",
  };

  // Request body for invoking the agent
  const body: Record<string, any> = {
    input: message,
    agent: {
      type: "agent_reference",
      name: AZURE_AGENT_ID,
      version: API_VERSION,
    },
    background: false,
    store: true,
  };

  // Add conversation ID if provided (for multi-turn conversations)
  if (conversationId) {
    body.conversation_id = conversationId;
  }

  console.log(`Calling Azure Agent: ${url}`);
  console.log(`Body: ${JSON.stringify(body)}`);

  // Call Azure AI Foundry Agent
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to invoke agent:", response.status, errorText);
    
    // Provide more helpful error messages
    if (response.status === 401) {
      throw new Error("Authentication failed. Please check your AZURE_AGENT_API_KEY.");
    } else if (response.status === 404) {
      throw new Error("Agent not found. Please check AZURE_AGENT_ID and AZURE_AGENT_ENDPOINT.");
    } else if (response.status === 429) {
      throw new Error("Rate limit exceeded. Please try again later.");
    } else {
      throw new Error(`Azure AI Foundry API error: ${response.status} - ${errorText}`);
    }
  }

  const data = await response.json();
  console.log("Response received:", JSON.stringify(data, null, 2));

  // Parse the chatbot response - handle multiple possible response formats
  let chatbotReply = "No response text found";
  
  if (data.output_text) {
    chatbotReply = data.output_text;
  } else if (data.output && typeof data.output === 'string') {
    chatbotReply = data.output;
  } else if (data.choices && data.choices[0] && data.choices[0].message) {
    chatbotReply = data.choices[0].message.content;
  } else if (data.text) {
    chatbotReply = data.text;
  }

  // Extract conversation ID for multi-turn conversations
  const newConversationId = data.conversation_id || conversationId;

  return {
    reply: chatbotReply,
    conversationId: newConversationId
  };
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

    const { messages, conversationId }: RequestBody = await req.json();

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

    // Call Azure Agent using the Agents Responses API
    const result = await callAzureAgent(sanitizedContent, conversationId);

    console.log("Azure Agent response received, length:", result.reply.length);

    return new Response(
      JSON.stringify({ 
        response: result.reply,
        conversationId: result.conversationId
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
