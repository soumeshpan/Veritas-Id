import { ReactNode } from "react";
import { motion } from "motion/react";
import { GlowingEffect } from "./ui/glowing-effect";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** Disable the mouse-tracking glowing border. Defaults to false (glow enabled). */
  noGlow?: boolean;
}

export function GlassCard({ children, className = "", hover = true, noGlow = false }: GlassCardProps) {
  return (
    <motion.div
      className={`
        relative backdrop-blur-3xl bg-white/40 dark:bg-[#08021a]/60 
        border border-white/40 dark:border-white/10 rounded-2xl p-8
        shadow-[0_8px_32px_rgba(0,0,0,0.05)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]
        transform-gpu
        will-change-transform will-change-backdrop-filter
        ${hover ? "transition-all duration-300 hover:border-[#F5B942]/50 hover:shadow-[0_0_30px_rgba(245,185,66,0.3)]" : ""}
        ${className}
      `}
      whileHover={hover ? { y: -5 } : {}}
      transition={{ duration: 0.3 }}
    >
      {/* Glowing mouse-tracking border effect */}
      {!noGlow && (
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={2}
        />
      )}
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
