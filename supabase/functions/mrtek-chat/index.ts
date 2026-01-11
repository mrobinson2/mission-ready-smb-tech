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

// Azure AI Foundry Agent Service - OpenAI-compatible Assistants API
// Uses the threads/runs pattern with api-key authentication
const API_VERSION = "2024-05-01-preview";

async function azureApiCall(path: string, method: string, body?: unknown): Promise<Response> {
  // AZURE_AGENT_ENDPOINT: https://foundry-mrtek-dev.services.ai.azure.com/api/projects/MRTek-CAT-Dev
  const url = `${AZURE_AGENT_ENDPOINT}${path}`;
  console.log(`Azure API call: ${method} ${url}`);
  
  const headers: Record<string, string> = {
    "api-key": AZURE_AGENT_API_KEY!,
    "Content-Type": "application/json",
  };

  return await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
}

// Create a new thread
async function createThread(): Promise<string> {
  const response = await azureApiCall(`/threads?api-version=${API_VERSION}`, "POST", {});
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to create thread:", response.status, errorText);
    throw new Error(`Failed to create thread: ${response.status} - ${errorText}`);
  }
  
  const data = await response.json();
  console.log("Thread created:", data.id);
  return data.id;
}

// Add a message to a thread
async function addMessage(threadId: string, content: string, role: string = "user"): Promise<void> {
  const response = await azureApiCall(
    `/threads/${threadId}/messages?api-version=${API_VERSION}`,
    "POST",
    { role, content }
  );
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Failed to add message:", response.status, errorText);
    throw new Error(`Failed to add message: ${response.status}`);
  }
  
  console.log("Message added to thread");
}

// Create a run and wait for completion
async function createAndWaitForRun(threadId: string): Promise<string> {
  // Create the run
  const runResponse = await azureApiCall(
    `/threads/${threadId}/runs?api-version=${API_VERSION}`,
    "POST",
    { assistant_id: AZURE_AGENT_ID }
  );
  
  if (!runResponse.ok) {
    const errorText = await runResponse.text();
    console.error("Failed to create run:", runResponse.status, errorText);
    throw new Error(`Failed to create run: ${runResponse.status}`);
  }
  
  const runData = await runResponse.json();
  const runId = runData.id;
  console.log("Run created:", runId, "Status:", runData.status);
  
  // Poll for completion (max 60 seconds)
  const maxAttempts = 60;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    const statusResponse = await azureApiCall(
      `/threads/${threadId}/runs/${runId}?api-version=${API_VERSION}`,
      "GET"
    );
    
    if (!statusResponse.ok) {
      const errorText = await statusResponse.text();
      console.error("Failed to check run status:", statusResponse.status, errorText);
      throw new Error(`Failed to check run status: ${statusResponse.status}`);
    }
    
    const statusData = await statusResponse.json();
    console.log("Run status:", statusData.status);
    
    if (statusData.status === "completed") {
      break;
    } else if (statusData.status === "failed" || statusData.status === "cancelled" || statusData.status === "expired") {
      console.error("Run failed with status:", statusData.status, statusData.last_error);
      throw new Error(`Run failed: ${statusData.status} - ${statusData.last_error?.message || 'Unknown error'}`);
    }
    
    // Wait 1 second before polling again
    await new Promise(resolve => setTimeout(resolve, 1000));
    attempts++;
  }
  
  if (attempts >= maxAttempts) {
    throw new Error("Run timed out after 60 seconds");
  }
  
  // Get the latest messages
  const messagesResponse = await azureApiCall(
    `/threads/${threadId}/messages?api-version=${API_VERSION}&limit=1&order=desc`,
    "GET"
  );
  
  if (!messagesResponse.ok) {
    const errorText = await messagesResponse.text();
    console.error("Failed to get messages:", messagesResponse.status, errorText);
    throw new Error(`Failed to get messages: ${messagesResponse.status}`);
  }
  
  const messagesData = await messagesResponse.json();
  
  // Extract the assistant's response
  const assistantMessage = messagesData.data?.[0];
  if (!assistantMessage || assistantMessage.role !== "assistant") {
    console.error("No assistant message found in response");
    throw new Error("No assistant response found");
  }
  
  // Extract text content
  const textContent = assistantMessage.content?.find((c: any) => c.type === "text");
  if (!textContent?.text?.value) {
    console.error("No text content in assistant message");
    throw new Error("No text content in response");
  }
  
  return textContent.text.value;
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

    // Create a new thread
    const threadId = await createThread();
    
    // Add the user's message
    await addMessage(threadId, sanitizedContent, "user");
    
    // Run the assistant and get response
    const assistantResponse = await createAndWaitForRun(threadId);

    console.log("Azure Agent response received, length:", assistantResponse.length);

    return new Response(
      JSON.stringify({ 
        response: assistantResponse,
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
