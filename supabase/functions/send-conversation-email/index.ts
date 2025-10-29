import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@4.0.0";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Validation schema
const emailRequestSchema = z.object({
  clientName: z.string().min(1).max(100).trim(),
  clientEmail: z.string().email().max(255).optional(),
  messages: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1).max(5000)
  })).min(1).max(50)
});

// HTML escaping function
const escapeHtml = (unsafe: string): string => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate request data
    const requestData = await req.json();
    const validatedData = emailRequestSchema.parse(requestData);
    const { clientName, clientEmail, messages } = validatedData;

    console.log("Sending conversation email");

    // Format conversation history with HTML escaping
    const conversationHTML = messages
      .map((msg) => {
        const role = msg.role === "user" ? "Cliente" : "AI Assistant";
        const bgColor = msg.role === "user" ? "#f0f9ff" : "#f9fafb";
        const escapedContent = escapeHtml(msg.content);
        return `
          <div style="margin: 15px 0; padding: 15px; background-color: ${bgColor}; border-radius: 8px;">
            <strong style="color: #1e40af;">${role}:</strong>
            <p style="margin: 5px 0 0 0; white-space: pre-wrap;">${escapedContent}</p>
          </div>
        `;
      })
      .join("");

    const emailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Nueva Conversación con Cliente</title>
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 12px 12px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">💬 Nueva Conversación con Cliente</h1>
          </div>
          
          <div style="background-color: #ffffff; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
              <h2 style="margin: 0 0 10px 0; color: #1f2937; font-size: 20px;">📋 Información del Cliente</h2>
              <p style="margin: 5px 0;"><strong>Nombre:</strong> ${escapeHtml(clientName)}</p>
              ${clientEmail ? `<p style="margin: 5px 0;"><strong>Email:</strong> ${escapeHtml(clientEmail)}</p>` : ""}
              <p style="margin: 5px 0;"><strong>Fecha:</strong> ${new Date().toLocaleString("es-ES", { timeZone: "America/New_York" })}</p>
            </div>

            <h2 style="color: #1f2937; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">💭 Historial de Conversación</h2>
            ${conversationHTML}
            
            <div style="margin-top: 30px; padding: 20px; background-color: #ecfdf5; border-left: 4px solid #10b981; border-radius: 4px;">
              <p style="margin: 0; color: #065f46;"><strong>✅ Acción Sugerida:</strong> Revisar la conversación y contactar al cliente para darle seguimiento.</p>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding: 20px; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">Este email fue generado automáticamente por el sistema de AI Chat de OneHands.ai</p>
          </div>
        </body>
      </html>
    `;

    const emailResponse = await resend.emails.send({
      from: "OneHands AI <onboarding@resend.dev>",
      to: ["itechtofix@gmail.com"],
      subject: `🤖 Nueva Conversación con ${clientName}`,
      html: emailHTML,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending conversation email:", error);
    
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: "Invalid request data" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: "An error occurred sending the email" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
