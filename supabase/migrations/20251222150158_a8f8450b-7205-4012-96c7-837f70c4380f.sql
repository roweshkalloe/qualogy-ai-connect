-- Add parent_id column to post_comments for threaded replies
ALTER TABLE public.post_comments
ADD COLUMN parent_id uuid REFERENCES public.post_comments(id) ON DELETE CASCADE;

-- Create index for faster lookup of replies
CREATE INDEX idx_post_comments_parent_id ON public.post_comments(parent_id);