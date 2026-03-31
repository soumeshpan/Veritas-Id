import { GraduationCap, Newspaper, Briefcase, ArrowRight, Database, Shield, Zap } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { ScrollReveal } from "../components/scroll-reveal";
import { motion } from "motion/react";

export function About() {
  const useCases = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "Verify academic papers, research documents, and certifications",
      color: "#F5B942",
      bgColor: "rgba(245, 185, 66, 0.1)",
    },
    {
      icon: Newspaper,
      title: "News & Media",
      description: "Authenticate journalism, prevent misinformation, and protect editorial integrity",
      color: "#4A9FF5",
      bgColor: "rgba(74, 159, 245, 0.1)",
    },
    {
      icon: Briefcase,
      title: "Recruitment",
      description: "Validate resumes, portfolios, and professional credentials",
      color: "#4ADE80",
      bgColor: "rgba(74, 222, 128, 0.1)",
    },
  ];
  
  const workflowSteps = [
    {
      step: 1,
      title: "Content Submission",
      description: "User submits digital content to VeritasID platform",
      detail: "Content is securely transmitted using TLS encryption",
    },
    {
      step: 2,
      title: "Hash Generation",
      description: "Cryptographic hash (SHA-256) is created from content",
      detail: "Unique fingerprint that changes if even a single character is modified",
    },
    {
      step: 3,
      title: "Blockchain Storage",
      description: "Hash and metadata are stored on distributed ledger",
      detail: "Immutable record that cannot be altered or deleted",
    },
    {
      step: 4,
      title: "Certificate Issuance",
      description: "VeritasID certificate with unique ID is generated",
      detail: "Can be shared and verified by anyone at any time",
    },
  ];
  
  const architectureComponents = [
    {
      icon: Database,
      title: "Distributed Ledger",
      description: "Immutable blockchain storage for verification records",
    },
    {
      icon: Shield,
      title: "Cryptographic Hashing",
      description: "SHA-256 algorithm for content fingerprinting",
    },
    {
      icon: Zap,
      title: "Real-time Verification",
      description: "Instant content matching and integrity checks",
    },
  ];
  
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4">How VeritasID Works</h1>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              A comprehensive look at our content authentication system and its real-world applications
            </p>
          </div>
        </ScrollReveal>
        
        {/* Architecture */}
        <ScrollReveal>
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">System Architecture</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {architectureComponents.map((component, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard>
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#F5B942]/20 border border-[#F5B942]/30 flex items-center justify-center">
                        <component.icon className="w-8 h-8 text-[#F5B942]" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{component.title}</h3>
                      <p className="text-sm text-white/60">{component.description}</p>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
        
        {/* Workflow */}
        <ScrollReveal>
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Verification Workflow</h2>
            <div className="space-y-6">
              {workflowSteps.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard>
                    <div className="flex gap-6 items-start">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F5B942] to-[#F5B942]/70 flex items-center justify-center">
                          <span className="text-2xl font-bold text-[#0B1220]">{step.step}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                        <p className="text-white/70 mb-2">{step.description}</p>
                        <div className="flex items-start gap-2 text-sm text-white/50">
                          <ArrowRight className="w-4 h-4 mt-0.5 text-[#4A9FF5]" />
                          <span>{step.detail}</span>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
        
        {/* Diagram Visualization */}
        <ScrollReveal>
          <section className="mb-20">
            <GlassCard hover={false} className="bg-gradient-to-br from-white/5 to-transparent">
              <h3 className="text-2xl font-bold mb-8 text-center">Flow Diagram</h3>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                {["User", "VeritasID Platform", "Blockchain", "Certificate"].map((node, i) => (
                  <motion.div
                    key={i}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#4A9FF5]/20 to-[#F5B942]/20 border-2 border-[#F5B942]/30 flex items-center justify-center p-4">
                      <span className="text-center font-bold text-sm">{node}</span>
                    </div>
                    {i < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-8 transform -translate-y-1/2">
                        <ArrowRight className="w-6 h-6 text-[#F5B942]" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </section>
        </ScrollReveal>
        
        {/* Use Cases */}
        <ScrollReveal>
          <section className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-center">Real-World Applications</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {useCases.map((useCase, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard>
                    <div className="text-center">
                      <div 
                        className="w-16 h-16 mx-auto mb-4 rounded-2xl border-2 flex items-center justify-center"
                        style={{ 
                          backgroundColor: useCase.bgColor,
                          borderColor: `${useCase.color}50`
                        }}
                      >
                        <useCase.icon className="w-8 h-8" style={{ color: useCase.color }} />
                      </div>
                      <h3 className="text-xl font-bold mb-3" style={{ color: useCase.color }}>
                        {useCase.title}
                      </h3>
                      <p className="text-white/70">{useCase.description}</p>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </section>
        </ScrollReveal>
        
        {/* Technical Specs */}
        <ScrollReveal>
          <section>
            <GlassCard className="bg-gradient-to-br from-[#F5B942]/10 to-[#4A9FF5]/10 border-[#F5B942]/30">
              <h2 className="text-2xl font-bold mb-6 text-center">Technical Specifications</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { label: "Hashing Algorithm", value: "SHA-256" },
                  { label: "Blockchain Network", value: "Distributed Ledger" },
                  { label: "Verification Time", value: "< 1 second" },
                  { label: "Storage Type", value: "Immutable Records" },
                  { label: "Encryption", value: "TLS 1.3" },
                  { label: "Uptime SLA", value: "99.9%" },
                ].map((spec, i) => (
                  <div key={i} className="flex justify-between items-center p-4 rounded-lg bg-white/5 border border-white/10">
                    <span className="text-white/70">{spec.label}</span>
                    <span className="font-bold text-[#F5B942]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </section>
        </ScrollReveal>
      </div>
    </div>
  );
}
