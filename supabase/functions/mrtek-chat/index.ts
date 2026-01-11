import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Environment variables
const AZURE_AGENT_ENDPOINT = Deno.env.get("AZURE_AGENT_ENDPOINT");
const AZURE_AGENT_API_KEY = Deno.env.get("AZURE_AGENT_API_KEY");
const AZURE_AGENT_ID = Deno.env.get("AZURE_AGENT_ID");
const API_VERSION = "2024-12-01-preview";

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
  threadId?: string;
}

// Build URL helper - ensures proper path construction
function buildUrl(path: string): string {
  const baseUrl = AZURE_AGENT_ENDPOINT!.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}?api-version=${API_VERSION}`;
}

// Common headers - using api-key authentication
function getHeaders(): Record<string, string> {
  return {
    "api-key": AZURE_AGENT_API_KEY!,
    "Content-Type": "application/json",
  };
}

async function createThread(): Promise<string> {
  const url = buildUrl("/threads");
  console.log(`Creating thread: ${url}`);
  
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to create thread:", response.status, errorText);
    throw new Error(`Failed to create thread: ${response.status} - ${errorText}`);
  }

  const data = await response.json();
  console.log("Thread created:", data.id);
  return data.id;
}

async function addMessage(threadId: string, content: string): Promise<void> {
  const url = buildUrl(`/threads/${threadId}/messages`);
  console.log(`Adding message to thread: ${url}`);
  
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      role: "user",
      content: content,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to add message:", response.status, errorText);
    throw new Error(`Failed to add message: ${response.status} - ${errorText}`);
  }

  console.log("Message added successfully");
}

async function runAgent(threadId: string): Promise<string> {
  const url = buildUrl(`/threads/${threadId}/runs`);
  console.log(`Running agent: ${url}`);
  
  const response = await fetch(url, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify({
      assistant_id: AZURE_AGENT_ID,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to run agent:", response.status, errorText);
    throw new Error(`Failed to run agent: ${response.status} - ${errorText}`);
  }

  const runData = await response.json();
  const runId = runData.id;
  console.log("Run started:", runId);

  // Poll for completion
  let status = runData.status;
  let attempts = 0;
  const maxAttempts = 60;

  while (status !== "completed" && status !== "failed" && status !== "cancelled" && attempts < maxAttempts) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const statusUrl = buildUrl(`/threads/${threadId}/runs/${runId}`);
    const statusResponse = await fetch(statusUrl, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      console.error("Failed to check run status:", statusResponse.status, errorText);
      throw new Error(`Failed to check run status: ${statusResponse.status}`);
    }

    const statusData = await statusResponse.json();
    status = statusData.status;
    attempts++;
    console.log(`Run status: ${status} (attempt ${attempts})`);
  }

  if (status !== "completed") {
    throw new Error(`Run did not complete successfully. Final status: ${status}`);
  }

  // Get the messages to find the assistant's response
  const messagesUrl = buildUrl(`/threads/${threadId}/messages`);
  const messagesResponse = await fetch(messagesUrl, {
    method: "GET",
    headers: getHeaders(),
  });

  if (!messagesResponse.ok) {
    const errorText = await messagesResponse.text();
    console.error("Failed to get messages:", messagesResponse.status, errorText);
    throw new Error(`Failed to get messages: ${messagesResponse.status}`);
  }

  const messagesData = await messagesResponse.json();
  console.log("Messages retrieved:", JSON.stringify(messagesData, null, 2));

  // Find the latest assistant message
  const assistantMessages = messagesData.data?.filter((m: any) => m.role === "assistant") || [];
  if (assistantMessages.length === 0) {
    return "I apologize, but I couldn't generate a response. Please try again.";
  }

  const latestMessage = assistantMessages[0];
  const content = latestMessage.content?.[0]?.text?.value || 
                  latestMessage.content?.[0]?.text ||
                  latestMessage.content ||
                  "No response content found";

  return typeof content === 'string' ? content : JSON.stringify(content);
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

    const { messages, threadId: existingThreadId }: RequestBody = await req.json();

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

    // Use existing thread or create new one
    const threadId = existingThreadId || await createThread();
    
    // Add the user message to the thread
    await addMessage(threadId, sanitizedContent);
    
    // Run the agent and get the response
    const response = await runAgent(threadId);

    console.log("Agent response received, length:", response.length);

    return new Response(
      JSON.stringify({ 
        response: response,
        threadId: threadId
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
