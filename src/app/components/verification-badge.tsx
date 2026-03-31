import { CheckCircle2, AlertTriangle } from "lucide-react";
import { motion } from "motion/react";

interface VerificationBadgeProps {
  status: "authentic" | "modified" | "pending";
  size?: "sm" | "md" | "lg";
}

export function VerificationBadge({ status, size = "md" }: VerificationBadgeProps) {
  const config = {
    authentic: {
      icon: CheckCircle2,
      label: "Authentic Content",
      color: "#4ADE80",
      bgColor: "rgba(74, 222, 128, 0.1)",
      borderColor: "rgba(74, 222, 128, 0.3)",
    },
    modified: {
      icon: AlertTriangle,
      label: "Modified Content",
      color: "#F5B942",
      bgColor: "rgba(245, 185, 66, 0.1)",
      borderColor: "rgba(245, 185, 66, 0.3)",
    },
    pending: {
      icon: AlertTriangle,
      label: "Pending Verification",
      color: "#8B92A7",
      bgColor: "rgba(139, 146, 167, 0.1)",
      borderColor: "rgba(139, 146, 167, 0.3)",
    },
  };
  
  const { icon: Icon, label, color, bgColor, borderColor } = config[status];
  
  const sizeConfig = {
    sm: { iconSize: 16, padding: "px-3 py-1.5", text: "text-xs" },
    md: { iconSize: 20, padding: "px-4 py-2", text: "text-sm" },
    lg: { iconSize: 24, padding: "px-6 py-3", text: "text-base" },
  };
  
  const { iconSize, padding, text } = sizeConfig[size];
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex items-center gap-2 rounded-full border
        ${padding} ${text} font-medium
      `}
      style={{
        backgroundColor: bgColor,
        borderColor: borderColor,
        color: color,
        boxShadow: `0 0 20px ${color}20`,
      }}
    >
      <Icon size={iconSize} />
      <span>{label}</span>
    </motion.div>
  );
}
