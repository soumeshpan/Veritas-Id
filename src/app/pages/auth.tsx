import { useState } from "react";
import { useNavigate } from "react-router";
import { Lock, User, Mail, Sparkles } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { GradientButton } from "../components/ui/gradient-button";
import { SmartInput } from "../components/smart-input";
import { LoadingOverlay } from "../components/ui/loading-overlay";
import { ScrollReveal } from "../components/scroll-reveal";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { useAuth } from "../contexts/AuthContext";

export function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    // Hardcoded bypass for specific credentials
    if (email === "hritambasu1@gmail.com" && password === "123456") {
      toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
      login({ id: 999, email: "hritambasu1@gmail.com" });
      navigate("/");
      setIsLoading(false);
      return;
    }

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/signup";

    try {
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(isLogin ? "Welcome back!" : "Account created successfully!");
        login(data.user);
        navigate("/");
      } else {
        toast.error(isLogin ? "Login failed" : "Signup failed", { 
          description: data.error || "Unknown error occurred" 
        });
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Connection Error", { 
        description: "Failed to connect to the authentication server." 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <LoadingOverlay isVisible={isLoading} message={isLogin ? "Authenticating..." : "Creating Account..."} />
      <div className="min-h-screen px-6 py-12 flex items-center justify-center">
        <div className="w-full max-w-md relative z-10">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5B942]/10 border border-[#F5B942]/30 mb-6">
                <Lock className="w-4 h-4 text-[#F5B942]" />
                <span className="text-sm text-[#F5B942]">Secure Access</span>
              </div>
              <h1 className="text-4xl font-bold mb-3 text-slate-900 dark:text-white">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-slate-600 dark:text-white/70">
                {isLogin ? "Enter your credentials to access VeritasID" : "Sign up to start authenticating content"}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <GlassCard hover={false}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isLogin ? "login" : "signup"}
                    initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                  >
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-white/80">Email</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Mail className="w-5 h-5 text-slate-400 dark:text-white/40" />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full pl-10 pr-4 py-3 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-lg text-slate-900 dark:text-white outline-none focus:border-[#F5B942] transition-colors"
                          autoFocus
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700 dark:text-white/80">Password</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <Lock className="w-5 h-5 text-slate-400 dark:text-white/40" />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-3 bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 rounded-lg text-slate-900 dark:text-white outline-none focus:border-[#F5B942] transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                <GradientButton type="submit" className="w-full" disabled={isLoading}>
                  {isLogin ? "Sign In" : "Sign Up"}
                </GradientButton>

                <div className="text-center pt-2 text-sm">
                  <span className="text-slate-500 dark:text-white/50">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                  </span>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-[#F5B942] hover:underline font-medium"
                  >
                    {isLogin ? "Sign Up" : "Sign In"}
                  </button>
                </div>
              </form>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
}
