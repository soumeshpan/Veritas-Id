import { motion, AnimatePresence } from "motion/react";
import { Loader2 } from "lucide-react";

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

export function LoadingOverlay({ isVisible, message = "Processing..." }: LoadingOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="flex flex-col items-center justify-center p-8 rounded-2xl bg-white/10 dark:bg-black/40 border border-white/20 backdrop-blur-xl shadow-2xl"
          >
            <Loader2 className="w-12 h-12 text-[#F5B942] animate-spin mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{message}</h3>
            <p className="text-sm text-white/70">Please wait while we secure the data.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
