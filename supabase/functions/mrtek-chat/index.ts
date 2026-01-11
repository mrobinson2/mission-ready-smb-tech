import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// Environment variables
const AZURE_CHAT_PROXY_URL = Deno.env.get("AZURE_CHAT_PROXY_URL");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Rate limiting setup - General messages (FAQ + AI)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 20;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

// Rate limiting setup - AI calls only (separate, stricter limit)
const aiRateLimitStore = new Map<string, { count: number; resetTime: number }>();
const AI_RATE_LIMIT = 5; // Max 5 AI calls per IP per hour
const AI_RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

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

function checkAIRateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = aiRateLimitStore.get(ip);
  
  if (!entry || now > entry.resetTime) {
    aiRateLimitStore.set(ip, { count: 1, resetTime: now + AI_RATE_WINDOW_MS });
    return { allowed: true, remaining: AI_RATE_LIMIT - 1 };
  }
  
  if (entry.count >= AI_RATE_LIMIT) {
    return { allowed: false, remaining: 0 };
  }
  
  entry.count++;
  return { allowed: true, remaining: AI_RATE_LIMIT - entry.count };
}

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  threadId?: string;
}

// ============================================
// SCRIPTED FAQ RESPONSES (no AI call needed)
// ============================================

interface FAQEntry {
  patterns: string[];  // Keywords/phrases to match
  response: string;    // Scripted response
}

const SCRIPTED_FAQS: FAQEntry[] = [
  {
    patterns: ["what services", "services do you offer", "what do you offer", "your services"],
    response: `MRTek.ai offers a range of services designed to help small and medium businesses leverage technology effectively:

• AI Digital Assistant – Your 24/7 virtual office team for email triage, customer support automation, lead qualification, and more.
• Cloud Consulting – Cloud migration, infrastructure optimization, security setup, and cost management.
• AI Advisory – Strategic guidance for AI adoption including readiness assessments and implementation roadmaps.
• Website & Automation – Website development, workflow automation, and tool integrations.
• Fractional CTO – Executive-level technology leadership without full-time overhead.

Would you like to learn more about any specific service?`
  },
  {
    patterns: ["ai digital assistant", "tell me about the ai", "digital assistant service", "virtual assistant", "ai assistant service"],
    response: `The AI Digital Assistant is MRTek.ai's flagship service—think of it as your 24/7 Virtual Office Team.

What it does:
• Email triage and response drafting
• Customer support automation
• Lead qualification and follow-up
• Voice note transcription
• Virtual receptionist for calls
• Website chatbot integration

Who it's for: Small business owners who are stretched thin and need help handling repetitive communication tasks without hiring additional staff.

Key benefits: Free up your time, respond faster to customers, and create consistent, professional communication—all while you maintain control. Our human-in-the-loop approach means AI handles the repetitive work while you make the important decisions.

Ready to explore how this could work for your business? Reach out to Michael at michael@mrtek.ai!`
  },
  {
    patterns: ["90 days", "get started", "how do i start", "getting started", "next steps", "90-day", "ninety day"],
    response: `Great question! Most small businesses can see meaningful AI and automation results within 90 days. Here's our approach:

Week 1-2: Discovery
Understand your business, current tools, pain points, and goals. We learn how you work so we can recommend solutions that actually fit.

Week 3-4: Strategy
Design a pragmatic plan for cloud, AI, and automation. We prioritize quick wins while planning for sustainable growth.

Week 5-8: Implementation
Configure, integrate, and launch AI-powered workflows and assistants. We handle the technical work while keeping you in control.

Week 9-12: Optimization
Monitor, improve, and expand based on real usage and metrics. Continuous improvement, not set-and-forget.

Want to kick off your 90-day plan? Email Michael at michael@mrtek.ai to schedule a discovery call!`
  },
  {
    patterns: ["how much", "pricing", "cost", "price", "what does it cost", "how much does"],
    response: `MRTek.ai offers flexible pricing models to fit different needs:

• Starter Packages – Fixed-scope projects with clear deliverables. Great for specific implementations like setting up an AI assistant or automating a workflow.

• Advisory Retainer – Monthly ongoing support with regular check-ins. Ideal for consistent access to tech expertise without a full-time commitment.

• Project-Based – Custom implementations scoped to your specific needs for larger transformations or complex integrations.

Pricing depends on your specific situation, scope, and goals. The best way to get a tailored estimate is to share a bit about your business and what you're looking to accomplish.

Ready to discuss? Reach out to Michael at michael@mrtek.ai—he typically responds within 24 business hours.`
  }
];

/**
 * Check if the user message matches any FAQ patterns
 * Returns the scripted response if matched, null otherwise
 */
function matchFAQ(message: string): string | null {
  const normalized = message.toLowerCase().trim().replace(/[?!.,]/g, '');
  
  for (const faq of SCRIPTED_FAQS) {
    for (const pattern of faq.patterns) {
      if (normalized.includes(pattern.toLowerCase())) {
        console.log(`FAQ matched: "${pattern}" in message: "${message}"`);
        return faq.response;
      }
    }
  }
  
  return null;
}

// ============================================
// AZURE FUNCTION APP PROXY
// ============================================

async function callAzureProxy(messages: ChatMessage[], threadId?: string): Promise<{ response: string; threadId?: string }> {
  if (!AZURE_CHAT_PROXY_URL) {
    console.error("AZURE_CHAT_PROXY_URL not configured");
    throw new Error("AI service not configured");
  }

  console.log("Calling Azure Function App proxy");
  
  const fetchResponse = await fetch(AZURE_CHAT_PROXY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      threadId,
    }),
  });

  if (!fetchResponse.ok) {
    const errorText = await fetchResponse.text();
    console.error("Azure Function App error:", fetchResponse.status, errorText);
    throw new Error(`Azure Function error: ${fetchResponse.status}`);
  }

  const data = await fetchResponse.json();
  console.log("Azure Function App response received:", JSON.stringify(data, null, 2));
  
  // Handle structured response from Azure Function
  // The Azure Function may return {reply_body, intent, ...} or {response: "..."}
  let responseText = "No response received";
  
  if (typeof data === 'string') {
    responseText = data;
  } else if (data.reply_body) {
    // Azure Function returns structured object with reply_body
    responseText = data.reply_body;
  } else if (data.response) {
    // Direct response field
    if (typeof data.response === 'string') {
      responseText = data.response;
    } else if (data.response.reply_body) {
      responseText = data.response.reply_body;
    }
  } else if (data.text) {
    responseText = data.text;
  } else if (data.content) {
    responseText = data.content;
  }
  
  return {
    response: responseText,
    threadId: data.threadId,
  };
}

// ============================================
// MAIN HANDLER
// ============================================

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

    // ============================================
    // STEP 1: Check for FAQ match (no AI call)
    // ============================================
    const faqResponse = matchFAQ(sanitizedContent);
    
    if (faqResponse) {
      console.log("Returning scripted FAQ response (no AI call)");
      return new Response(
        JSON.stringify({ 
          response: faqResponse,
          threadId: existingThreadId || null
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // ============================================
    // STEP 2: No FAQ match - check AI rate limit before calling Azure
    // ============================================
    const aiRateCheck = checkAIRateLimit(clientIP);
    
    if (!aiRateCheck.allowed) {
      console.log(`AI rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ 
          response: "I've reached my limit for detailed responses right now. For more help, please reach out directly to Michael at michael@mrtek.ai—he typically responds within 24 business hours!",
          threadId: existingThreadId || null
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`AI rate limit check passed. Remaining AI calls for this IP: ${aiRateCheck.remaining}`);
    console.log("No FAQ match, calling Azure Function App proxy");
    
    const result = await callAzureProxy(messages, existingThreadId);

    return new Response(
      JSON.stringify({ 
        response: result.response,
        threadId: result.threadId
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
