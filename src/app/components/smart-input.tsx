import { useState } from "react";
import { X, ClipboardPaste } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

interface SmartInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
  label?: string;
  guidanceText?: string;
  autoFocus?: boolean;
}

export function SmartInput({
  value,
  onChange,
  placeholder = "",
  maxLength,
  multiline = false,
  rows = 4,
  label,
  guidanceText,
  autoFocus = false,
}: SmartInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  const handleClear = () => {
    onChange("");
  };
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(value + text);
      toast.success("Pasted from clipboard");
    } catch (err) {
      toast.error("Failed to paste from clipboard");
    }
  };
  
  const InputElement = multiline ? "textarea" : "input";
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-center w-full text-sm text-slate-700 dark:text-white/80 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative group">
        <InputElement
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={multiline ? rows : undefined}
          autoFocus={autoFocus}
          className={`
            w-full px-4 py-3 
            bg-white/40 dark:bg-white/5 backdrop-blur-md
            border border-white/40 dark:border-white/10 rounded-lg
            text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30
            focus:outline-none
            transition-all duration-300 transform-gpu
            ${isFocused 
              ? "border-[#F5B942] shadow-[0_0_20px_rgba(245,185,66,0.2)]" 
              : "border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20"
            }
            ${multiline ? "resize-none" : ""}
          `}
        />
        
        {/* Clear button */}
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute right-3 top-3 p-1 rounded-md bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
              type="button"
            >
              <X className="w-4 h-4 text-slate-600 dark:text-white/60" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Paste button (visible when empty and multiline) */}
        <AnimatePresence>
          {!value && multiline && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handlePaste}
              className="absolute right-3 top-3 p-1.5 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5"
              type="button"
              title="Paste from clipboard"
            >
              <ClipboardPaste className="w-4 h-4 text-slate-500 dark:text-white/50" />
              <span className="text-xs font-medium text-slate-500 dark:text-white/50">Paste</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      
      <div className="flex flex-col items-center justify-center text-center text-xs w-full mt-2">
        {guidanceText && (
          <span className="text-slate-500 dark:text-white/50 mb-1">{guidanceText}</span>
        )}
        {maxLength && (
          <span className={`
            ${value.length > maxLength * 0.9 ? "text-[#F5B942]" : "text-slate-500 dark:text-white/50"}
          `}>
            {value.length} / {maxLength}
          </span>
        )}
      </div>
    </div>
  );
}
