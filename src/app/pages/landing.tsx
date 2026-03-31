import { Link } from "react-router";
import { Shield, Fingerprint, Lock, Zap, Globe, CheckCircle2 } from "lucide-react";
import { GlassCard } from "../components/glass-card";
import { GradientButton } from "../components/ui/gradient-button";
import { ScrollReveal } from "../components/scroll-reveal";
import { TrustScoreMeter } from "../components/trust-score-meter";
import { motion } from "motion/react";

export function Landing() {
  const features = [
    {
      icon: Fingerprint,
      title: "Content Fingerprinting",
      description: "Generate unique cryptographic signatures for any digital content",
    },
    {
      icon: Lock,
      title: "Immutable Records",
      description: "Store verification data on distributed ledger for tamper-proof authenticity",
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Verify content authenticity in seconds with our advanced algorithms",
    },
    {
      icon: Globe,
      title: "Universal Compatibility",
      description: "Works with text, images, documents, and more across all platforms",
    },
  ];
  
  const steps = [
    { number: 1, title: "Submit Content", description: "Upload or paste your digital content" },
    { number: 2, title: "Generate ID", description: "Receive unique VeritasID certificate" },
    { number: 3, title: "Verify Anytime", description: "Check authenticity whenever needed" },
  ];
  
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center px-6 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-[#F5B942]/10 border border-[#F5B942]/30">
              <span className="text-sm text-[#F5B942]">🔒 Blockchain-Powered Authentication</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              Verify Digital Truth with{" "}
              <span className="text-[#F5B942]">VeritasID</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Combat misinformation and ensure content authenticity with cryptographic proof-of-origin verification. 
              Trust every piece of digital content with confidence.
            </p>
          </motion.div>
          
          <motion.div
            className="flex gap-4 justify-center flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link to="/generate">
              <GradientButton>
                Generate VeritasID
              </GradientButton>
            </Link>
            <Link to="/verify">
              <GradientButton variant="variant">
                Verify Content
              </GradientButton>
            </Link>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            className="flex gap-12 justify-center pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { value: "1M+", label: "Contents Verified" },
              { value: "99.9%", label: "Accuracy Rate" },
              { value: "<1s", label: "Verification Time" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl font-bold text-[#F5B942]">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Problem Section */}
      <ScrollReveal>
        <section className="px-6 py-20 bg-gradient-to-b from-transparent via-[#1a2332]/50 to-transparent">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-bold">The Authenticity Crisis</h2>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              In an era of deepfakes and AI-generated content, distinguishing authentic information from 
              manipulated data has become critical. VeritasID provides cryptographic proof that content 
              remains unchanged since its creation.
            </p>
          </div>
        </section>
      </ScrollReveal>
      
      {/* How It Works */}
      <ScrollReveal>
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-white/70">Three simple steps to ensure content authenticity</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <ScrollReveal key={i} delay={i * 0.2}>
                  <GlassCard className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#F5B942]/20 border-2 border-[#F5B942] flex items-center justify-center">
                      <span className="text-2xl font-bold text-[#F5B942]">{step.number}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/60">{step.description}</p>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Features Grid */}
      <ScrollReveal>
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
              <p className="text-white/70">Enterprise-grade security meets simplicity</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, i) => (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <GlassCard>
                    <div className="flex gap-4">
                      <div className="p-3 rounded-xl bg-[#4A9FF5]/20 border border-[#4A9FF5]/30 h-fit">
                        <feature.icon className="w-6 h-6 text-[#4A9FF5]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                        <p className="text-white/60 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Trust Score Demo */}
      <ScrollReveal>
        <section className="px-6 py-20 bg-gradient-to-b from-transparent via-[#1a2332]/50 to-transparent">
          <div className="max-w-4xl mx-auto">
            <GlassCard hover={false}>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Trust Score System</h2>
                  <p className="text-white/70 mb-6">
                    Our advanced algorithm analyzes multiple factors to calculate a trust score, 
                    giving you instant confidence in content authenticity.
                  </p>
                  <ul className="space-y-3">
                    {["Content integrity check", "Timestamp verification", "Origin validation", "Modification detection"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-[#4ADE80]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                  <TrustScoreMeter score={92} size="lg" />
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>
      
      {/* CTA Section */}
      <ScrollReveal>
        <section className="px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard className="bg-gradient-to-br from-[#F5B942]/10 to-[#4A9FF5]/10 border-[#F5B942]/30">
              <Shield className="w-16 h-16 mx-auto mb-6 text-[#F5B942]" />
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Content?</h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                Join thousands of users who trust VeritasID for content authentication
              </p>
              <Link to="/generate">
                <GradientButton>
                  Get Started Now
                </GradientButton>
              </Link>
            </GlassCard>
          </div>
        </section>
      </ScrollReveal>
      
      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-sm text-white/50">
          <p>© 2026 VeritasID. Securing digital truth through cryptographic verification.</p>
        </div>
      </footer>
    </div>
  );
}
