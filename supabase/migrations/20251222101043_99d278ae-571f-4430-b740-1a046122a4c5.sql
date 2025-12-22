-- Add profession field to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS profession text;

-- Create role enum type
CREATE TYPE public.app_role AS ENUM ('admin', 'channel_admin', 'user');

-- Create user_roles table (following security best practices - roles in separate table)
CREATE TABLE public.user_roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create channels table
CREATE TABLE public.channels (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    slug text NOT NULL UNIQUE,
    description text,
    icon text NOT NULL DEFAULT 'Blocks',
    member_count integer NOT NULL DEFAULT 0,
    post_count integer NOT NULL DEFAULT 0,
    color text NOT NULL DEFAULT 'bg-primary/10',
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS on channels
ALTER TABLE public.channels ENABLE ROW LEVEL SECURITY;

-- Channels are publicly readable
CREATE POLICY "Channels are publicly readable"
ON public.channels
FOR SELECT
TO authenticated
USING (true);

-- Only admins can manage channels
CREATE POLICY "Admins can manage channels"
ON public.channels
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create channel_admins junction table
CREATE TABLE public.channel_admins (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    channel_id uuid REFERENCES public.channels(id) ON DELETE CASCADE NOT NULL,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    UNIQUE (channel_id, user_id)
);

-- Enable RLS on channel_admins
ALTER TABLE public.channel_admins ENABLE ROW LEVEL SECURITY;

-- Channel admins are viewable by authenticated users
CREATE POLICY "Channel admins are viewable"
ON public.channel_admins
FOR SELECT
TO authenticated
USING (true);

-- Admins can manage channel admins
CREATE POLICY "Admins can manage channel admins"
ON public.channel_admins
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Channel admins can manage their own channels' admins
CREATE POLICY "Channel admins can manage their channel admins"
ON public.channel_admins
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1 FROM public.channel_admins ca
        WHERE ca.channel_id = channel_admins.channel_id
        AND ca.user_id = auth.uid()
    )
);

-- Create trigger for channels updated_at
CREATE TRIGGER update_channels_updated_at
BEFORE UPDATE ON public.channels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();