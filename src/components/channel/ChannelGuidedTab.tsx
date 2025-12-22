import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Rocket } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GuidedPractice } from '@/data/mockData';

interface ChannelGuidedTabProps {
  practices: GuidedPractice[];
}

const levelConfig = {
  Beginner: { icon: BookOpen, color: 'bg-green-100 text-green-700 border-green-200' },
  Intermediate: { icon: GraduationCap, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  Advanced: { icon: Rocket, color: 'bg-purple-100 text-purple-700 border-purple-200' },
};

const ChannelGuidedTab = ({ practices }: ChannelGuidedTabProps) => {
  if (practices.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 px-4"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No guided practices yet</h3>
          <p className="text-muted-foreground max-w-sm mx-auto">
            Check back soon for AI tasks and best practices for this profession.
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
        <h2 className="text-lg font-semibold text-foreground mb-1">Guided Practice</h2>
        <p className="text-sm text-muted-foreground">
          AI tasks, example workflows, and best practices for your profession
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {practices.map((practice, index) => {
          const config = levelConfig[practice.level];
          const LevelIcon = config.icon;

          return (
            <motion.div
              key={practice.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full card-interactive cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base group-hover:text-primary transition-colors">
                      {practice.title}
                    </CardTitle>
                    <Badge variant="outline" className={`shrink-0 ${config.color}`}>
                      <LevelIcon className="w-3 h-3 mr-1" />
                      {practice.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {practice.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ChannelGuidedTab;
