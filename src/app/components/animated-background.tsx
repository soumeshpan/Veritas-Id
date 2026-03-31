import { motion } from "motion/react";

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Liquid Glass Noise Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
          transform: "translateZ(0)",
        }}
      />
      
      {/* Gradient orbs (Liquid Lamp Effect) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[1200px] h-[1200px] rounded-full opacity-[0.15] dark:opacity-20 mix-blend-screen dark:mix-blend-color-dodge"
        style={{
          background: "radial-gradient(circle, rgba(245,185,66,0.8) 0%, rgba(245,185,66,0) 50%)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] right-[-10%] w-[1000px] h-[1000px] rounded-full opacity-[0.12] dark:opacity-15 mix-blend-screen dark:mix-blend-color-dodge"
        style={{
          background: "radial-gradient(circle, rgba(74,159,245,0.8) 0%, rgba(74,159,245,0) 50%)",
          willChange: "transform",
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute top-[30%] left-[30%] w-[800px] h-[800px] rounded-full opacity-[0.08] dark:opacity-10 mix-blend-screen dark:mix-blend-color-dodge"
        style={{
          background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0) 50%)",
          willChange: "transform",
        }}
        animate={{
          x: [0, 150, -100, 0],
          y: [0, 100, -150, 0],
          scale: [1, 1.5, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      {/* Floating particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white/10 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
      
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
