import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface SuccessAnimationProps {
  message?: string;
}

export function SuccessAnimation({ message = "Success!" }: SuccessAnimationProps) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-8"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2 
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 rounded-full bg-[#4ADE80]"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <CheckCircle2 className="w-20 h-20 text-[#4ADE80] relative z-10" />
        </div>
      </motion.div>
      
      <motion.p
        className="mt-4 text-lg font-medium text-[#4ADE80]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        {message}
      </motion.p>
    </motion.div>
  );
}
