import { motion } from 'framer-motion';
import { Trophy, Quote } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Showcase } from '@/data/mockData';

interface ChannelShowcasesTabProps {
  showcases: Showcase[];
}

const ChannelShowcasesTab = ({ showcases }: ChannelShowcasesTabProps) => {
  if (showcases.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Trophy className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No showcases yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Success stories from employees will appear here.
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
        <h2 className="text-lg font-semibold text-foreground mb-1">Showcases</h2>
        <p className="text-sm text-muted-foreground">
          Success stories and real-world AI applications from your colleagues
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {showcases.map((showcase, index) => (
          <motion.div
            key={showcase.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full relative overflow-hidden">
              {/* Decorative accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/50" />
              
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{showcase.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm font-medium text-foreground">{showcase.author}</span>
                      <Badge variant="secondary" className="text-xs">
                        {showcase.role}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative pl-4 border-l-2 border-muted">
                  <Quote className="absolute -left-3 -top-1 w-5 h-5 text-muted-foreground/50 bg-card" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    {showcase.story}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ChannelShowcasesTab;
