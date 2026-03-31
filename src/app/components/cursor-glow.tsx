import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CursorGlow() {
  const [isVisible, setIsVisible] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 100);
      cursorY.set(e.clientY - 100);
      setIsVisible(true);
    };
    
    const hideCursor = () => setIsVisible(false);
    
    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
    };
  }, []);
  
  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-screen"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: 200,
        height: 200,
        opacity: isVisible ? 0.15 : 0,
        willChange: "transform",
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,185,66,0.8) 0%, rgba(245,185,66,0) 60%)",
        }}
      />
    </motion.div>
  );
}
