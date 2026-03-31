import { LucideIcon } from "lucide-react";
import { GlassCard } from "./glass-card";
import { motion } from "motion/react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: string;
  delay?: number;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color = "#4A9FF5",
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      <GlassCard>
        <div className="flex gap-4">
          <div 
            className="p-3 rounded-xl border h-fit flex-shrink-0"
            style={{ 
              backgroundColor: `${color}20`,
              borderColor: `${color}30`
            }}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </div>
          <div>
            <h3 className="text-lg font-bold mb-2">{title}</h3>
            <p className="text-white/60 text-sm">{description}</p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
