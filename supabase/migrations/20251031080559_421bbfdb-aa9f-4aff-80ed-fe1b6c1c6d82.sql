-- Fix PUBLIC_DATA_EXPOSURE: Remove user-scoped RLS policies
-- Since the app uses anonymous chat with edge functions managing all data via service role,
-- we only need service-role policies, not user-scoped policies

-- Drop user-scoped policies on conversations table
DROP POLICY IF EXISTS "Users can view own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can insert own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update own conversations" ON public.conversations;

-- Drop user-scoped policies on conversation_insights table
DROP POLICY IF EXISTS "Users can view own insights" ON public.conversation_insights;

-- Drop user-scoped policies on rate_limits table
DROP POLICY IF EXISTS "Users can view own rate limits" ON public.rate_limits;

-- Keep only service role policies (these already exist and are correct)
-- Service role can manage all conversations
-- Service role can manage all insights
-- Service role can manage all rate limits