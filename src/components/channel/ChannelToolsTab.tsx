import { motion } from 'framer-motion';
import { Wrench, ExternalLink, Building2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tool } from '@/data/mockData';

interface ChannelToolsTabProps {
  tools: Tool[];
}

const ChannelToolsTab = ({ tools }: ChannelToolsTabProps) => {
  if (tools.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Wrench className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No tools yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            AI-related tools for this channel will appear here.
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
        <h2 className="text-lg font-semibold text-foreground mb-1">Tool Library</h2>
        <p className="text-sm text-muted-foreground">
          AI-related tools and resources for this profession
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        {tools.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card className="h-full card-interactive cursor-pointer group">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {tool.name}
                    </CardTitle>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      tool.type === 'Internal'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-gray-50 text-gray-700 border-gray-200'
                    }
                  >
                    {tool.type === 'Internal' ? (
                      <Building2 className="w-3 h-3 mr-1" />
                    ) : (
                      <ExternalLink className="w-3 h-3 mr-1" />
                    )}
                    {tool.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  {tool.description}
                </CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChannelToolsTab;
