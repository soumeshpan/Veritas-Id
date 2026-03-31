import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface TrustScoreMeterProps {
  score: number; // 0-100
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function TrustScoreMeter({ score, size = "md", showLabel = true }: TrustScoreMeterProps) {
  const [displayScore, setDisplayScore] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayScore(score);
    }, 100);
    return () => clearTimeout(timer);
  }, [score]);
  
  const sizeConfig = {
    sm: { width: 120, height: 120, strokeWidth: 8 },
    md: { width: 160, height: 160, strokeWidth: 10 },
    lg: { width: 200, height: 200, strokeWidth: 12 },
  };
  
  const { width, height, strokeWidth } = sizeConfig[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;
  
  const getColor = (score: number) => {
    if (score >= 80) return "#4ADE80"; // Green
    if (score >= 50) return "#F5B942"; // Gold
    return "#EF4444"; // Red
  };
  
  const color = getColor(score);
  
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative" style={{ width, height }}>
        {/* Background circle */}
        <svg width={width} height={height} className="transform -rotate-90">
          <circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          {/* Progress circle */}
          <motion.circle
            cx={width / 2}
            cy={height / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              strokeDasharray: circumference,
              filter: `drop-shadow(0 0 10px ${color}40)`,
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className="text-4xl font-bold"
            style={{ color }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {Math.round(displayScore)}
          </motion.span>
          <span className="text-xs text-white/50">Trust Score</span>
        </div>
      </div>
      
      {showLabel && (
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color }}>
            {score >= 80 ? "Highly Trusted" : score >= 50 ? "Moderately Trusted" : "Low Trust"}
          </p>
        </div>
      )}
    </div>
  );
}
