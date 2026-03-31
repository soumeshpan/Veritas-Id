import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { GradientButton } from "../components/ui/gradient-button";
import { SmartInput } from "../components/smart-input";
import { CertificateCard } from "../components/certificate-card";
import { StepProgress } from "../components/step-progress";
import { ScrollReveal } from "../components/scroll-reveal";
import { LoadingOverlay } from "../components/ui/loading-overlay";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function Generate() {
  const [content, setContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [certificate, setCertificate] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState(0);
  

  const steps = [
    { label: "Input Content", description: "Paste or type your content" },
    { label: "Generate ID", description: "Creating unique signature" },
    { label: "Certificate Ready", description: "View your VeritasID" },
  ];

  
  const handleGenerate = async () => {
    setIsGenerating(true);
    setCurrentStep(1);
    
    try {
      const response = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      const data = await response.json();
      
      if (data.certificate) {
        const formattedCert = {
          ...data.certificate,
          timestamp: new Date(data.certificate.timestamp).toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
        };
        setCertificate(formattedCert);
        toast.success("VeritasID successfully generated!");
      } else {
        toast.error("Generation failed", { description: data.error || "Unknown error" });
      }
    } catch (error) {
      console.error("Error generating passport:", error);
      toast.error("Connection Error", { description: "Failed to connect to the VeritasID server." });
    }
    
    setCurrentStep(2);
    setIsGenerating(false);
  };
  
  const handleReset = () => {
    setContent("");
    setCertificate(null);
    setCurrentStep(0);
  };
  
  return (
    <>
      <LoadingOverlay isVisible={isGenerating} message="Generating VeritasID..." />
      <div className="min-h-screen px-6 py-12">
        <div className="max-w-5xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center w-full flex flex-col items-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5B942]/10 border border-[#F5B942]/30 mb-6 mt-16">
              <Sparkles className="w-4 h-4 text-[#F5B942]" />
              <span className="text-sm text-[#F5B942]">Content Authentication</span>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-slate-900 dark:text-white">Generate VeritasID</h1>
            <p className="text-xl text-slate-600 dark:text-white/70 max-w-2xl mx-auto">
              Create a cryptographic certificate for your content to prove its authenticity
            </p>
          </div>
        </ScrollReveal>
        
        {/* Step Progress */}
        <ScrollReveal delay={0.2}>
          <div className="mb-12">
            <StepProgress steps={steps} currentStep={currentStep} />
          </div>
        </ScrollReveal>
        
        {/* Content Input */}
        <AnimatePresence mode="wait">
          {!certificate ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <GlassCard>
                <div className="space-y-6">
                  <div className="flex flex-col items-center justify-center text-center w-full gap-3 pb-6 border-b border-black/10 dark:border-white/10">
                    <div className="p-3 rounded-full bg-[#4A9FF5]/20 border border-[#4A9FF5]/30 mb-2">
                      <FileText className="w-6 h-6 text-[#4A9FF5]" />
                    </div>
                    <div className="w-full text-center">
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Content Input</h2>
                      <p className="text-sm text-slate-600 dark:text-white/50">Enter the content you want to authenticate</p>
                    </div>
                  </div>
                  
                  <SmartInput
                    value={content}
                    onChange={setContent}
                    placeholder="Paste or type your content here... (text, articles, documents, etc.)"
                    multiline
                    rows={10}
                    maxLength={5000}
                    guidanceText="Your content will be processed to generate a unique cryptographic signature"
                  />
                  
                  <div className="flex gap-4">
                    <GradientButton
                      className="flex-1"
                      onClick={handleGenerate}
                      disabled={!content.trim() || isGenerating}
                    >
                      {isGenerating ? (
                        <span className="flex items-center justify-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Sparkles className="w-4 h-4" />
                          </motion.div>
                          Generating...
                        </span>
                      ) : (
                        "Generate VeritasID"
                      )}
                    </GradientButton>
                  </div>
                  
                  {/* Info Cards */}
                  <div className="grid md:grid-cols-3 gap-4 pt-6 border-t border-black/10 dark:border-white/10">
                    {[
                      { label: "Secure", desc: "End-to-end encryption" },
                      { label: "Fast", desc: "Generated in seconds" },
                      { label: "Permanent", desc: "Immutable record" },
                    ].map((info, i) => (
                      <div key={i} className="text-center p-3 rounded-lg bg-black/5 dark:bg-white/5">
                        <div className="text-[#F5B942] font-bold mb-1">{info.label}</div>
                        <div className="text-xs text-slate-600 dark:text-white/50">{info.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ) : (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="space-y-6"
            >
              {/* Success Message */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-6 rounded-2xl bg-[#4ADE80]/10 border border-[#4ADE80]/30"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4ADE80]/20 flex items-center justify-center">
                  <Sparkles className="w-8 h-8 text-[#4ADE80]" />
                </div>
                <h2 className="text-2xl font-bold mb-2 text-[#4ADE80]">Certificate Generated!</h2>
                <p className="text-white/70">Your content has been successfully authenticated</p>
              </motion.div>
              
              {/* Certificate */}
              <CertificateCard {...certificate} />
              
              {/* Actions */}
              <div className="flex gap-4">
                <GradientButton variant="variant" onClick={handleReset} className="flex-1">
                  Generate Another
                </GradientButton>
                <GradientButton onClick={() => window.print()} className="flex-1">
                  Download PDF
                </GradientButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
