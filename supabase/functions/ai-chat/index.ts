import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    console.log('Received messages:', messages);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Call Lovable AI Gateway
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are a workflow automation consultant AI for OneHands.ai. ALWAYS respond in the same language the user writes to you (English, Spanish, etc.).

Your mission is to understand their business workflow and evaluate automation possibilities.

Conversation flow:
1. FIRST MESSAGE: If this is the first user message, greet them warmly and ask for their NAME. Keep it simple: "Nice to meet you! What's your name?"
2. UNDERSTAND THE BUSINESS: After getting their name, ask what their company does, what industry, and main activities.
3. MAP THE WORKFLOW: What is the current process/workflow they want to automate? Ask them to describe it step by step.
4. IDENTIFY PAIN POINTS: What takes the most time? What's repetitive? What causes errors?
5. EVALUATE FEASIBILITY: Based on what they told you, explain if it's automatable and HOW it could be automated with AI/automation tools.
6. PROPOSE SEQUENCE: If automatable, describe a clear sequence of how the automation would work (input → process → output).

Be conversational and natural. Keep responses concise (under 120 words). Ask follow-up questions to understand deeply. Use their name when appropriate to create a personal connection.

After gathering complete information about their workflow and providing automation feasibility + sequence (usually after 5-7 exchanges), provide this closing message in their language:

English:
"Based on what you've shared, I can see clear automation opportunities for your workflow. I'd love to connect you with our OneHands.ai team to design a custom solution.

👉 Contact us on WhatsApp: https://wa.me/17869606797

Our specialists will create a detailed automation plan tailored to your specific needs!"

Spanish:
"Basándome en lo que compartiste, veo oportunidades claras de automatización para tu flujo de trabajo. Me encantaría conectarte con nuestro equipo de OneHands.ai para diseñar una solución personalizada.

👉 Contáctanos por WhatsApp: https://wa.me/17869606797

¡Nuestros especialistas crearán un plan de automatización detallado adaptado a tus necesidades específicas!"

Only provide the WhatsApp link after you've understood their workflow, evaluated feasibility, and proposed an automation sequence.`
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI Gateway error: ${response.status}`);
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error) {
    console.error('Error in ai-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
