-- Create conversations table to store all chat interactions
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  user_name TEXT,
  user_contact TEXT,
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  business_info JSONB,
  workflow_proposal TEXT,
  estimated_budget NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create conversation insights table for structured analysis
CREATE TABLE public.conversation_insights (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  industry TEXT,
  pain_points TEXT[],
  automation_complexity TEXT CHECK (automation_complexity IN ('low', 'medium', 'high')),
  estimated_hours NUMERIC,
  key_technologies TEXT[],
  similar_cases_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_conversations_session_id ON public.conversations(session_id);
CREATE INDEX idx_conversations_created_at ON public.conversations(created_at DESC);
CREATE INDEX idx_insights_conversation_id ON public.conversation_insights(conversation_id);
CREATE INDEX idx_insights_industry ON public.conversation_insights(industry);

-- Enable RLS (for future admin access)
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_insights ENABLE ROW LEVEL SECURITY;

-- Allow service role to do everything (for edge functions)
CREATE POLICY "Service role can manage conversations" 
ON public.conversations 
FOR ALL 
TO service_role
USING (true) 
WITH CHECK (true);

CREATE POLICY "Service role can manage insights" 
ON public.conversation_insights 
FOR ALL 
TO service_role
USING (true) 
WITH CHECK (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_conversations_updated_at
BEFORE UPDATE ON public.conversations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();