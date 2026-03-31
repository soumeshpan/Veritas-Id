import { Link, useLocation } from "react-router";
import { Shield, LogOut } from "lucide-react";
import { motion } from "motion/react";
import { ModeToggle } from "./mode-toggle";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "sonner";

export function Navigation() {
  const location = useLocation();
  const { isAuthenticated, logout, user } = useAuth();
  
  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
  };
  
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Generate", path: "/generate" },
    { name: "Verify", path: "/verify" },
    { name: "About", path: "/about" },
  ];
  
  return (
    <motion.nav
      className="sticky top-0 z-50 backdrop-blur-2xl bg-white/30 dark:bg-[#0B1220]/50 border-b border-black/5 dark:border-white/10 transform-gpu"
      style={{ willChange: "transform, backdrop-filter" }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-[#F5B942] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(245,185,66,0.6)]" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-white/80 bg-clip-text text-transparent">
              VeritasID
            </span>
          </Link>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative px-4 py-2 text-sm transition-colors duration-300"
                >
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-[#F5B942] font-semibold" : "text-slate-600 dark:text-white/70 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-lg border border-[#F5B942]/30 dark:border-[#F5B942]/40 backdrop-blur-sm"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>
              );
            })}
            
            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-4 pl-4 border-l border-slate-300 dark:border-white/10">
              <ModeToggle />
              
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 dark:text-white/70 hover:text-red-500 dark:hover:text-red-400 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  title={`Logged in as ${user?.email}`}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
