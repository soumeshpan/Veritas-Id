import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "motion/react";
import { GlowingEffect } from "./ui/glowing-effect";

interface GlowButtonProps extends Omit<HTMLMotionProps<"button">, "variant" | "size"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: any;
  disabled?: boolean;
}

export function GlowButton({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: GlowButtonProps) {
  const baseStyles = "relative group font-medium rounded-lg transition-all duration-300 overflow-hidden";
  
  const variantStyles = {
    primary: "bg-[#F5B942] text-[#0B1220] hover:shadow-[0_0_30px_rgba(245,185,66,0.5)]",
    secondary: "bg-[#4A9FF5] text-white hover:shadow-[0_0_30px_rgba(74,159,245,0.5)]",
    outline: "border-2 border-[#F5B942] text-[#F5B942] hover:bg-[#F5B942]/10 hover:shadow-[0_0_20px_rgba(245,185,66,0.3)]",
  };
  
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };
  
  return (
    <motion.button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Mouse-tracking glowing border effect */}
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={48}
        inactiveZone={0.01}
        borderWidth={2}
      />
      {/* Shimmer sweep on hover */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
