import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@4.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface BookingData {
  name: string;
  email: string;
  date: string;
  time: string;
  message?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, date, time, message }: BookingData = await req.json();

    console.log("Sending booking notification:", { name, email, date, time });

    // Send notification email to you
    const emailResponse = await resend.emails.send({
      from: "MRTek.ai Scheduler <onboarding@resend.dev>",
      to: ["michael@mrtek.ai"],
      replyTo: email,
      subject: `New Meeting Scheduled with ${name}`,
      html: `
        <h2>New Meeting Scheduled</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Time:</strong> ${time}</p>
        ${message ? `<p><strong>Additional Notes:</strong></p><p>${message}</p>` : ''}
        <hr>
        <p>Please confirm this meeting with the client.</p>
      `,
    });

    console.log("Booking email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Error sending booking email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
