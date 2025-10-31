import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Validation schemas
const messageSchema = z.object({
  role: z.enum(['user', 'assistant']),
  content: z.string().min(1).max(5000).trim()
});

const aiChatRequestSchema = z.object({
  messages: z.array(messageSchema).min(1).max(50),
  sessionId: z.string().regex(/^session_[0-9]+_[a-z0-9]+$/).max(100),
  clientName: z.string().max(100).trim().optional()
});

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get user ID from JWT token if available (optional for anonymous users)
    const authHeader = req.headers.get('Authorization');
    let userId = null;
    
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '');
        const payload = JSON.parse(atob(token.split('.')[1]));
        userId = payload.sub;
      } catch (error) {
        console.log('Could not parse auth token, continuing as anonymous');
      }
    }

    // Validate request data
    const requestData = await req.json();
    const validatedData = aiChatRequestSchema.parse(requestData);
    const { messages, sessionId, clientName } = validatedData;
    
    console.log('Received messages:', messages.length);
    console.log('Session ID:', sessionId.substring(0, 15) + '...');
    console.log('User ID:', userId.substring(0, 8) + '...');

    // Initialize Supabase client with service role
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      console.error('Required API configuration missing');
      throw new Error('Service configuration error');
    }

    // Rate limiting check (only if user is authenticated)
    if (userId) {
      const rateLimitResult = await checkRateLimit(supabase, sessionId, userId, req);
      if (!rateLimitResult.allowed) {
        return new Response(
          JSON.stringify({ error: rateLimitResult.message }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // Get historical insights to improve responses
    let historicalContext = '';
    try {
      const { data: insights, error } = await supabase
        .from('conversation_insights')
        .select('industry, automation_complexity, estimated_hours, key_technologies')
        .limit(10)
        .order('created_at', { ascending: false });

      if (insights && insights.length > 0) {
        const avgHours = insights.reduce((sum, i) => sum + (i.estimated_hours || 0), 0) / insights.length;
        const commonIndustries = [...new Set(insights.map(i => i.industry).filter(Boolean))];
        const commonTechs = [...new Set(insights.flatMap(i => i.key_technologies || []))];
        
        historicalContext = `\n\nBased on ${insights.length} previous consultations:
- Average project duration: ${avgHours.toFixed(0)} hours
- Common industries: ${commonIndustries.join(', ')}
- Frequently used technologies: ${commonTechs.slice(0, 5).join(', ')}
Use this context to provide more accurate estimates and recommendations.`;
      }
    } catch (error) {
      console.error('Error fetching historical insights');
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
            content: `You are a workflow automation consultant AI for OneHands.ai. ALWAYS respond in the same language the user writes to you (English, Spanish, etc.).${historicalContext}

Your mission is to understand their business workflow and evaluate automation possibilities.

Conversation flow:
1. FIRST MESSAGE: If this is the first user message, greet them warmly and ask for their NAME. Keep it simple: "Nice to meet you! What's your name?"
2. UNDERSTAND THE BUSINESS: After getting their name, ask what their company does, what industry, and main activities.
3. MAP THE WORKFLOW: What is the current process/workflow they want to automate? Ask them to describe it step by step.
4. IDENTIFY PAIN POINTS: What takes the most time? What's repetitive? What causes errors?
5. EVALUATE FEASIBILITY: Based on what they told you, explain if it's automatable and HOW it could be automated with AI/automation tools.
6. PROPOSE VISUAL WORKFLOW: Once you understand their needs, present a clear visual workflow proposal using this format:

📋 WORKFLOW PROPOSAL:
Step 1: [Input/Trigger] → [What happens]
Step 2: [Process] → [What happens]
Step 3: [Output/Result] → [What happens]

🎯 Expected Benefits:
• [Benefit 1]
• [Benefit 2]
• [Benefit 3]

💰 Estimated Budget: $[amount] - $[amount] USD
⏱️ Estimated Time: [X-Y] weeks

Be conversational and natural. Keep responses concise (under 150 words). Ask follow-up questions to understand deeply. Use their name when appropriate to create a personal connection.

After gathering complete information about their workflow and providing the visual workflow proposal (usually after 5-7 exchanges), provide this closing message in their language:

English:
"Ready to bring this automation to life? Let's connect on WhatsApp to discuss implementation details and pricing!

[WHATSAPP_BUTTON]https://wa.me/17869606797[/WHATSAPP_BUTTON]

Our specialists will create a detailed plan and timeline for your project."

Spanish:
"¿Listo para hacer realidad esta automatización? ¡Conectemos por WhatsApp para discutir detalles de implementación y precios!

[WHATSAPP_BUTTON]https://wa.me/17869606797[/WHATSAPP_BUTTON]

Nuestros especialistas crearán un plan detallado y cronograma para tu proyecto."

Only provide the WhatsApp button after you've understood their workflow, evaluated feasibility, and proposed a visual workflow.`
          },
          ...messages
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status);
      
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

    // Save conversation asynchronously only if user is authenticated
    if (sessionId && userId) {
      saveConversation(supabase, sessionId, userId, messages).catch(() => 
        console.error('Error saving conversation')
      );
    }

    // Return the streaming response
    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
      },
    });

  } catch (error) {
    console.error('Error in ai-chat function');
    
    // Handle validation errors specifically
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({ error: 'Invalid request data' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ error: 'An error occurred processing your request' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }
});

// Function to save conversation to database
async function saveConversation(supabase: any, sessionId: string, userId: string, messages: any[]) {
  try {
    // Extract user name from messages if available
    let userName = null;
    let businessInfo = null;
    let workflowProposal = null;
    
    for (const msg of messages) {
      if (msg.role === 'assistant' && msg.content.includes('📋 WORKFLOW PROPOSAL')) {
        workflowProposal = msg.content;
      }
    }

    // Check if conversation exists
    const { data: existing } = await supabase
      .from('conversations')
      .select('id, messages')
      .eq('session_id', sessionId)
      .eq('user_id', userId)
      .single();

    if (existing) {
      // Update existing conversation
      await supabase
        .from('conversations')
        .update({
          messages: messages,
          workflow_proposal: workflowProposal || existing.workflow_proposal
        })
        .eq('id', existing.id);
    } else {
      // Create new conversation
      const { data: newConv } = await supabase
        .from('conversations')
        .insert({
          session_id: sessionId,
          user_id: userId,
          messages: messages,
          workflow_proposal: workflowProposal
        })
        .select()
        .single();

      // Analyze and create insights if we have enough data
      if (messages.length >= 4) {
        analyzeAndSaveInsights(supabase, newConv.id, userId, messages).catch(() =>
          console.error('Error analyzing conversation')
        );
      }
    }
  } catch (error) {
    console.error('Error in saveConversation');
  }
}

// Function to analyze conversation and extract insights
async function analyzeAndSaveInsights(supabase: any, conversationId: string, userId: string, messages: any[]) {
  try {
    // Simple pattern matching to extract insights
    const conversationText = messages.map(m => m.content).join(' ').toLowerCase();
    
    let industry = null;
    const industries = ['real estate', 'retail', 'healthcare', 'finance', 'education', 'manufacturing'];
    for (const ind of industries) {
      if (conversationText.includes(ind)) {
        industry = ind;
        break;
      }
    }

    let complexity = 'medium';
    if (conversationText.includes('simple') || conversationText.includes('basic')) {
      complexity = 'low';
    } else if (conversationText.includes('complex') || conversationText.includes('advanced')) {
      complexity = 'high';
    }

    const estimatedHours = complexity === 'low' ? 40 : complexity === 'medium' ? 80 : 120;

    await supabase
      .from('conversation_insights')
      .insert({
        conversation_id: conversationId,
        user_id: userId,
        industry,
        automation_complexity: complexity,
        estimated_hours: estimatedHours,
        key_technologies: ['n8n', 'AI', 'API Integration']
      });
  } catch (error) {
    console.error('Error in analyzeAndSaveInsights');
  }
}

// Rate limiting function
async function checkRateLimit(supabase: any, sessionId: string, userId: string, req: Request): Promise<{ allowed: boolean; message: string }> {
  try {
    const oneHourAgo = new Date(Date.now() - 3600000);
    const clientIP = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check user-based limits (primary rate limit)
    const { data: userLimit } = await supabase
      .from('rate_limits')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (userLimit) {
      const lastRequest = new Date(userLimit.last_request);
      
      // User limit: 15 messages per hour
      if (userLimit.request_count >= 15 && lastRequest > oneHourAgo) {
        return {
          allowed: false,
          message: 'Rate limit exceeded. Please wait before sending more messages.'
        };
      }

      // Update existing record
      const newCount = lastRequest > oneHourAgo ? userLimit.request_count + 1 : 1;
      await supabase.from('rate_limits').upsert({
        session_id: sessionId,
        user_id: userId,
        request_count: newCount,
        last_request: new Date(),
        first_request: lastRequest > oneHourAgo ? userLimit.first_request : new Date(),
        client_ip: clientIP
      });
    } else {
      // Create new rate limit record
      await supabase.from('rate_limits').insert({
        session_id: sessionId,
        user_id: userId,
        request_count: 1,
        client_ip: clientIP
      });
    }

    return { allowed: true, message: '' };
  } catch (error) {
    console.error('Rate limit check failed');
    // Allow request if rate limit check fails (fail open for availability)
    return { allowed: true, message: '' };
  }
}
