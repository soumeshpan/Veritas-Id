import { Outlet, useLocation } from "react-router";
import { Navigation } from "./navigation";
import AnimatedShaderBackground from "./ui/animated-shader-background";
import { CursorGlow } from "./cursor-glow";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { AnimatePresence, motion } from "motion/react";

export function Layout() {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="veritas-theme">
      <div className="min-h-screen bg-transparent text-slate-900 dark:text-white transition-colors duration-300">
        <CursorGlow />
        {/* WebGL Aurora Shader Background */}
        <AnimatedShaderBackground />
        <Navigation />
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}