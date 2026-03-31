import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface StatCounterProps {
  value: string;
  label: string;
  color?: string;
}

export function StatCounter({ value, label, color = "#F5B942" }: StatCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-3xl font-bold mb-1"
        style={{ color }}
        initial={{ scale: 0.8 }}
        animate={isVisible ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-white/50">{label}</div>
    </motion.div>
  );
}
