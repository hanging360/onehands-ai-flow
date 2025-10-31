-- Add user_id columns to tables for proper data isolation
ALTER TABLE public.conversations 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.conversation_insights 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE public.rate_limits 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;

-- Create index for better query performance
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
CREATE INDEX idx_conversation_insights_user_id ON public.conversation_insights(user_id);
CREATE INDEX idx_rate_limits_user_id ON public.rate_limits(user_id);

-- Update RLS policies for conversations table
DROP POLICY IF EXISTS "Service role can select conversations" ON public.conversations;
DROP POLICY IF EXISTS "Service role can insert conversations" ON public.conversations;
DROP POLICY IF EXISTS "Service role can update conversations" ON public.conversations;

-- Allow users to view their own conversations
CREATE POLICY "Users can view own conversations"
ON public.conversations
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Allow users to insert their own conversations
CREATE POLICY "Users can insert own conversations"
ON public.conversations
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own conversations
CREATE POLICY "Users can update own conversations"
ON public.conversations
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Service role can still manage all conversations
CREATE POLICY "Service role can manage all conversations"
ON public.conversations
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Update RLS policies for conversation_insights table
DROP POLICY IF EXISTS "Service role can select insights" ON public.conversation_insights;
DROP POLICY IF EXISTS "Service role can insert insights" ON public.conversation_insights;

-- Allow users to view their own insights
CREATE POLICY "Users can view own insights"
ON public.conversation_insights
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Service role can manage all insights
CREATE POLICY "Service role can manage all insights"
ON public.conversation_insights
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Update RLS policies for rate_limits table
DROP POLICY IF EXISTS "Service role can manage rate limits" ON public.rate_limits;

-- Allow users to view their own rate limits
CREATE POLICY "Users can view own rate limits"
ON public.rate_limits
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Service role can manage all rate limits
CREATE POLICY "Service role can manage all rate limits"
ON public.rate_limits
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);