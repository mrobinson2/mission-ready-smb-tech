import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  "https://mrtek.ai",
  "https://www.mrtek.ai",
  "https://mrteka.ai",
  "https://www.mrteka.ai"
];

// Rate limiting: 5 requests per IP per hour
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovableproject.com') || origin.includes('localhost')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  // Clean up expired entries periodically
  if (Math.random() < 0.1) {
    for (const [key, value] of rateLimitStore.entries()) {
      if (now > value.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function getClientIP(req: Request): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
         req.headers.get("x-real-ip") || 
         "unknown";
}

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = getClientIP(req);
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { 
        status: 429, 
        headers: { 
          "Content-Type": "application/json",
          "Retry-After": String(rateLimitResult.retryAfter),
          ...corsHeaders 
        } 
      }
    );
  }

  try {
    const { name, email, company, service, message }: ContactFormData = await req.json();

    // Input validation
    if (!name || typeof name !== 'string' || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid name" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!email || typeof email !== 'string' || !email.includes('@') || email.length > 255) {
      return new Response(
        JSON.stringify({ error: "Invalid email" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (!message || typeof message !== 'string' || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Invalid message" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (company && (typeof company !== 'string' || company.length > 200)) {
      return new Response(
        JSON.stringify({ error: "Invalid company" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }
    if (service && (typeof service !== 'string' || service.length > 200)) {
      return new Response(
        JSON.stringify({ error: "Invalid service" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Sanitize inputs for HTML
    const sanitize = (str: string) => str.replace(/[<>&"']/g, (c) => ({
      '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;'
    }[c] || c));

    console.log("Sending contact form email:", { name: sanitize(name), email: sanitize(email), service });

    // Send notification email to you
    const emailResponse = await resend.emails.send({
      from: "MRTek.ai Contact Form <onboarding@resend.dev>",
      to: ["michael@mrtek.ai"],
      replyTo: email,
      subject: `New Contact Form Submission from ${sanitize(name)}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        ${company ? `<p><strong>Company:</strong> ${sanitize(company)}</p>` : ''}
        ${service ? `<p><strong>Service Interest:</strong> ${sanitize(service)}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${sanitize(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again or contact us directly at michael@mrtek.ai" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);