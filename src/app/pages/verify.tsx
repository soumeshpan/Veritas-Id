import { useState } from "react";
import { Search, AlertCircle, Info } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { GradientButton } from "../components/ui/gradient-button";
import { SmartInput } from "../components/smart-input";
import { VerificationBadge } from "../components/verification-badge";
import { TrustScoreMeter } from "../components/trust-score-meter";
import { ScrollReveal } from "../components/scroll-reveal";
import { Tooltip } from "../components/tooltip";
import { LoadingOverlay } from "../components/ui/loading-overlay";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function Verify() {
  const [content, setContent] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const handleVerify = async () => {
    setIsVerifying(true);
    
    try {
      const response = await fetch("http://localhost:3001/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      
      if (data.certificate) {
        setResult({
          status: data.status,
          trustScore: data.certificate.trustScore,
          timestamp: new Date(data.certificate.timestamp).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          contentId: data.certificate.contentId,
          modifications: data.modifications,
        });
        if (data.status === "authentic") {
          toast.success("Verification successful! Content is authentic.");
        } else {
          toast.warning("Modifications Detected", { description: "Content does not match original signature." });
        }
      } else {
        setResult({
          status: data.status,
          trustScore: 0,
          timestamp: "Unknown",
          contentId: "Unknown",
          modifications: data.modifications,
        });
        toast.warning("Modifications Detected", { description: "Content does not match original signature." });
      }
    } catch (error) {
      console.error("Error verifying passport:", error);
      toast.error("Connection Error", { description: "Failed to connect to the VeritasID server." });
    }
    
    setIsVerifying(false);
  };
  
  const handleReset = () => {
    setContent("");
    setResult(null);
  };
  
  return (
    <>
      <LoadingOverlay isVisible={isVerifying} message="Verifying Identity..." />
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A9FF5]/10 border border-[#4A9FF5]/30 mb-6 mt-16">
              <Search className="w-4 h-4 text-[#4A9FF5]" />
              <span className="text-sm text-[#4A9FF5]">Content Verification</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">Verify Content</h1>
            <p className="text-xl text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
              Check if content has been modified since its original authentication
            </p>
          </div>
        </ScrollReveal>
        
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Panel */}
          <ScrollReveal delay={0.2}>
            <GlassCard className="h-full">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#4A9FF5]/20 border border-[#4A9FF5]/30">
                      <Search className="w-5 h-5 text-[#4A9FF5]" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Content Input</h2>
                      <p className="text-sm text-slate-600 dark:text-white/50">Paste content to verify</p>
                    </div>
                  </div>
                  <Tooltip content="We'll compare this content against our authentication database">
                    <button className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                      <Info className="w-4 h-4 text-slate-400 dark:text-white/50" />
                    </button>
                  </Tooltip>
                </div>
                
                <SmartInput
                  value={content}
                  onChange={setContent}
                  placeholder="Paste the content you want to verify..."
                  multiline
                  rows={12}
                  maxLength={5000}
                  guidanceText="Enter content to check its authenticity"
                />
                
                <GradientButton
                  variant="variant"
                  className="w-full"
                  onClick={handleVerify}
                  disabled={!content.trim() || isVerifying}
                >
                  {isVerifying ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Search className="w-4 h-4" />
                      </motion.div>
                      Verifying...
                    </span>
                  ) : (
                    "Verify Content"
                  )}
                </GradientButton>
              </div>
            </GlassCard>
          </ScrollReveal>
          
          {/* Result Panel */}
          <ScrollReveal delay={0.3}>
            <GlassCard className="h-full">
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 border-2 border-dashed border-black/10 dark:border-white/20 flex items-center justify-center mb-4">
                      <Search className="w-10 h-10 text-slate-300 dark:text-white/30" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-slate-500 dark:text-white/50">No Results Yet</h3>
                    <p className="text-sm text-slate-400 dark:text-white/30">
                      Enter content and click verify to see results
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="space-y-6"
                  >
                    <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Verification Result</h2>
                      <button
                        onClick={handleReset}
                        className="text-sm text-[#F5B942] hover:underline"
                      >
                        Verify Another
                      </button>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="flex justify-center">
                      <VerificationBadge 
                        status={result.status as "authentic" | "modified"} 
                        size="lg" 
                      />
                    </div>
                    
                    {/* Trust Score */}
                    <div className="flex justify-center py-4">
                      <TrustScoreMeter score={result.trustScore} size="md" />
                    </div>
                    
                    {/* Details */}
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Content ID</p>
                        <p className="font-mono text-sm text-slate-900 dark:text-white">{result.contentId}</p>
                      </div>
                      
                      <div className="p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
                        <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Original Timestamp</p>
                        <p className="text-sm text-slate-900 dark:text-white">{result.timestamp}</p>
                      </div>
                      
                      {result.modifications && (
                        <div className="p-4 rounded-lg bg-[#F5B942]/10 border border-[#F5B942]/30">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertCircle className="w-4 h-4 text-[#F5B942]" />
                            <p className="text-sm font-medium text-[#F5B942]">Detected Modifications</p>
                          </div>
                          <ul className="space-y-2">
                            {result.modifications.map((mod: string, i: number) => (
                              <li key={i} className="text-xs text-slate-700 dark:text-white/70 flex items-start gap-2">
                                <span className="text-[#F5B942] mt-1">•</span>
                                <span>{mod}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {result.status === "authentic" && (
                        <div className="p-4 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/30">
                          <p className="text-sm text-[#4ADE80] flex items-center gap-2">
                            <span className="text-lg">✓</span>
                            This content matches our verified database and has not been modified.
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassCard>
          </ScrollReveal>
        </div>
        
        {/* Info Section */}
        <ScrollReveal delay={0.4}>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Instant Analysis",
                description: "Results in under 1 second",
                icon: "⚡",
              },
              {
                title: "Deep Inspection",
                description: "Multi-layer verification process",
                icon: "🔍",
              },
              {
                title: "Detailed Reports",
                description: "Comprehensive modification logs",
                icon: "📊",
              },
            ].map((item, i) => (
              <GlassCard key={i} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold mb-2 text-slate-900 dark:text-white">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-white/60">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
    </>
  );
}
