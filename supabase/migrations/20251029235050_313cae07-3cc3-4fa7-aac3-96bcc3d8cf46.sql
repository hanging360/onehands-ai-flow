-- Create rate limiting table for abuse prevention
CREATE TABLE IF NOT EXISTS public.rate_limits (
  session_id TEXT PRIMARY KEY,
  request_count INTEGER DEFAULT 0,
  email_sent_count INTEGER DEFAULT 0,
  first_request TIMESTAMPTZ DEFAULT NOW(),
  last_request TIMESTAMPTZ DEFAULT NOW(),
  client_ip TEXT
);

CREATE INDEX IF NOT EXISTS idx_rate_limits_last_request ON public.rate_limits(last_request);
CREATE INDEX IF NOT EXISTS idx_rate_limits_ip ON public.rate_limits(client_ip);

-- Enable RLS on rate_limits table
ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

-- Service role can manage rate limits
CREATE POLICY "Service role can manage rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Service role can manage conversations" ON public.conversations;
DROP POLICY IF EXISTS "Service role can manage insights" ON public.conversation_insights;

-- Create specific policies for conversations table (least privilege)
CREATE POLICY "Service role can select conversations"
ON public.conversations
FOR SELECT
TO service_role
USING (true);

CREATE POLICY "Service role can insert conversations"
ON public.conversations
FOR INSERT
TO service_role
WITH CHECK (true);

CREATE POLICY "Service role can update conversations"
ON public.conversations
FOR UPDATE
TO service_role
USING (true)
WITH CHECK (true);

-- Create specific policies for conversation_insights table (least privilege)
CREATE POLICY "Service role can select insights"
ON public.conversation_insights
FOR SELECT
TO service_role
USING (true);

CREATE POLICY "Service role can insert insights"
ON public.conversation_insights
FOR INSERT
TO service_role
WITH CHECK (true);