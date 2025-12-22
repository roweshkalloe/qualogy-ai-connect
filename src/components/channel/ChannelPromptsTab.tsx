import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Prompt } from '@/data/mockData';

interface ChannelPromptsTabProps {
  prompts: Prompt[];
}

const ChannelPromptsTab = ({ prompts }: ChannelPromptsTabProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (prompt: Prompt) => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopiedId(prompt.id);
      toast.success('Prompt copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy prompt');
    }
  };

  if (prompts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No prompts yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Curated AI prompts for this channel will appear here.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-lg font-semibold text-foreground mb-1">Prompt Library</h2>
        <p className="text-sm text-muted-foreground">
          Curated AI prompts to boost your productivity
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {prompts.map((prompt, index) => (
          <motion.div
            key={prompt.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{prompt.title}</CardTitle>
                      <CardDescription className="text-xs mt-0.5">
                        {prompt.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50 border border-border/50">
                  <p className="text-sm text-muted-foreground line-clamp-3 font-mono">
                    {prompt.prompt}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-2"
                  onClick={() => handleCopy(prompt)}
                >
                  {copiedId === prompt.id ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Prompt
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChannelPromptsTab;
