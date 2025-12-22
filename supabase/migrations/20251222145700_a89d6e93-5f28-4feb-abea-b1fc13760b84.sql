-- Allow reading profiles publicly for displaying author info on comments
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;

-- Create policy to allow public read access to profiles (for displaying author names/avatars)
CREATE POLICY "Profiles are publicly readable"
ON public.profiles
FOR SELECT
USING (true);

-- Ensure foreign key exists between post_comments and profiles
DO $$
BEGIN
  -- Check if foreign key already exists
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'post_comments_user_id_profiles_fkey'
    AND table_name = 'post_comments'
  ) THEN
    -- Add foreign key from post_comments.user_id to profiles.user_id
    ALTER TABLE public.post_comments
    ADD CONSTRAINT post_comments_user_id_profiles_fkey
    FOREIGN KEY (user_id) REFERENCES public.profiles(user_id) ON DELETE CASCADE;
  END IF;
END $$;