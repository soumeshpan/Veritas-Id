import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface CopyButtonProps {
  text: string;
  size?: "sm" | "md";
}

export function CopyButton({ text, size = "md" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Content ID copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy to clipboard.");
    }
  };
  
  const iconSize = size === "sm" ? 14 : 16;
  const buttonSize = size === "sm" ? "p-1.5" : "p-2";
  
  return (
    <motion.button
      onClick={handleCopy}
      className={`
        ${buttonSize} rounded-md 
        bg-white/5 hover:bg-white/10 
        border border-white/10 hover:border-[#F5B942]/30
        transition-all duration-300
        hover:shadow-[0_0_15px_rgba(245,185,66,0.2)]
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
          >
            <Check size={iconSize} className="text-[#4ADE80]" />
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
          >
            <Copy size={iconSize} className="text-white/60" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
