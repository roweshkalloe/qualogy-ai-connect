-- Create channel_members table to track user-channel memberships
CREATE TABLE public.channel_members (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  channel_id uuid NOT NULL REFERENCES public.channels(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (channel_id, user_id)
);

-- Enable RLS
ALTER TABLE public.channel_members ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own memberships"
ON public.channel_members
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Channel memberships are publicly countable"
ON public.channel_members
FOR SELECT
USING (true);

CREATE POLICY "Users can join channels"
ON public.channel_members
FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave channels"
ON public.channel_members
FOR DELETE
USING (auth.uid() = user_id);

-- Create index for faster lookups
CREATE INDEX idx_channel_members_user_id ON public.channel_members(user_id);
CREATE INDEX idx_channel_members_channel_id ON public.channel_members(channel_id);

-- Create trigger function to update member_count
CREATE OR REPLACE FUNCTION public.update_channel_member_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.channels SET member_count = member_count + 1 WHERE id = NEW.channel_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.channels SET member_count = member_count - 1 WHERE id = OLD.channel_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create trigger
CREATE TRIGGER update_channel_member_count_trigger
AFTER INSERT OR DELETE ON public.channel_members
FOR EACH ROW
EXECUTE FUNCTION public.update_channel_member_count();