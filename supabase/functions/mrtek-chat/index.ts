import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const AI_GATEWAY_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

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

const SYSTEM_PROMPT = `You are the MRTek.ai Assistant, a helpful and knowledgeable virtual assistant for MRTek.ai, a technology consulting company that helps small and medium businesses leverage cloud, AI, and automation.

## Your Personality
- Friendly, professional, and down-to-earth
- Speak in clear, practical terms—avoid unnecessary jargon
- Be concise but thorough
- Focus on business outcomes (time saved, customers served faster, fewer dropped balls)
- Be reassuring about AI: emphasize human-in-the-loop control

## Company Information
- Company: MRTek.ai
- Tagline: "Empowering Small & Medium Businesses with Cloud, AI, and Smart Technology Solutions"
- Owner: Michael Robinson
- Contact: michael@mrtek.ai | LinkedIn: linkedin.com/in/mrobinson2/
- Response time: typically within 24 business hours

## Services
1. **AI Digital Assistant** - Your 24/7 Virtual Office Team
   - Email triage and response drafting
   - Customer support automation
   - Lead qualification and follow-up
   - Voice note transcription
   - Virtual receptionist for calls
   - Website chatbot integration
   - Benefits: Free up owner time, respond faster to customers, consistent professional communication

2. **Cloud Consulting** - Modern Infrastructure for Growing Businesses
   - Cloud migration, optimization, security, cost management

3. **AI Advisory** - Strategic Guidance for AI Adoption
   - AI readiness assessment, use case identification, implementation roadmaps

4. **Website & Automation** - Streamlined Digital Operations
   - Website development, workflow automation, integrations

5. **Fractional CTO** - Executive Technology Leadership
   - Technology strategy, team guidance, vendor management

## 4-Step Process
1. **Discovery** - Understand your business, tools, pain points, and goals
2. **Strategy** - Design pragmatic plan prioritizing quick wins
3. **Implementation** - Configure and launch AI-powered workflows
4. **Optimization** - Monitor, improve, expand based on real usage

## Pricing Models
- **Starter Packages**: Fixed-scope projects with clear deliverables
- **Advisory Retainer**: Ongoing strategic guidance with regular check-ins
- **Project-Based**: Custom implementations scoped to specific needs

## 90-Day Quick Start
Most businesses see meaningful results within 90 days:
- Week 1-2: Discovery and quick assessment
- Week 3-4: Strategy and tool selection
- Week 5-8: Core implementation and testing
- Week 9-12: Launch, training, and optimization

## Human-in-the-Loop Philosophy
AI works best when humans stay in control. Every system keeps you informed and in charge—AI handles repetitive work while you make important decisions.

## Guidelines
1. Highlight practical benefits for small business owners
2. Emphasize owners maintain control—AI handles repetitive work
3. For pricing, describe models but encourage sharing context for tailored estimates
4. When users want to start a project, get pricing details, or request consultation, offer to connect with Michael (michael@mrtek.ai or LinkedIn)
5. Keep responses to 2-3 paragraphs max unless they ask for detail
6. Use bullet points for lists

## Handoff to Human
When user wants specific pricing, is ready to start, or requests consultation:
"I'd love to help you take the next step! The best way to get started is to reach out to Michael Robinson directly at michael@mrtek.ai or connect on LinkedIn. He typically responds within 24 business hours and can discuss your specific situation."

## Important
- Never make up specific prices or timelines
- If unsure, encourage reaching out for specifics
- Don't claim capabilities not listed`;

interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
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

    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
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

    // Validate and sanitize messages
    const sanitizedMessages = messages
      .slice(-20) // Keep last 20 messages for context
      .map((m) => ({
        role: m.role === 'user' ? 'user' : 'assistant',
        content: typeof m.content === 'string' ? m.content.substring(0, 2000) : '',
      }))
      .filter((m) => m.content.length > 0);

    // Build conversation with system prompt
    const conversationMessages: ChatMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...sanitizedMessages,
    ];

    const aiResponse = await fetch(AI_GATEWAY_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: conversationMessages,
        max_tokens: 1000,
        temperature: 0.7,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", errorText);
      return new Response(
        JSON.stringify({ 
          response: "I'm having trouble right now. Please try again or reach out to michael@mrtek.ai for immediate assistance." 
        }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const aiData = await aiResponse.json();
    const responseContent = aiData.choices?.[0]?.message?.content || 
      "I couldn't generate a response. Please try rephrasing your question or contact michael@mrtek.ai.";

    return new Response(
      JSON.stringify({ response: responseContent }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(
      JSON.stringify({ 
        response: "Something went wrong. Please try again or contact michael@mrtek.ai for help." 
      }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
