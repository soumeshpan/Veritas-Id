import { Shield, Calendar, Hash, Award } from "lucide-react";
import { GlassCard } from "./glass-card";
import { CopyButton } from "./copy-button";
import { TrustScoreMeter } from "./trust-score-meter";
import { motion } from "motion/react";

interface CertificateCardProps {
  contentId: string;
  timestamp: string;
  trustScore: number;
  hash: string;
}

export function CertificateCard({ contentId, timestamp, trustScore, hash }: CertificateCardProps) {
  return (
    <GlassCard hover={false} className="relative overflow-hidden">
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#F5B942]/20 to-transparent rounded-bl-full" />
      
      <div className="space-y-6">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-3 rounded-xl bg-[#F5B942]/20 border border-[#F5B942]/30">
            <Award className="w-6 h-6 text-[#F5B942]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Authentication Certificate</h3>
            <p className="text-sm text-slate-500 dark:text-white/50">Content Verified by VeritasID</p>
          </div>
        </motion.div>
        
        {/* Trust Score */}
        <motion.div 
          className="flex justify-center py-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <TrustScoreMeter score={trustScore} size="md" />
        </motion.div>
        
        {/* Certificate Details */}
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Content ID */}
          <div className="flex items-start justify-between p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Shield className="w-5 h-5 text-[#4A9FF5] mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Content ID</p>
                <p className="font-mono text-sm break-all text-slate-900 dark:text-white">{contentId}</p>
              </div>
            </div>
            <CopyButton text={contentId} size="sm" />
          </div>
          
          {/* Timestamp */}
          <div className="flex items-start justify-between p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#4A9FF5] mt-0.5" />
              <div>
                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Timestamp</p>
                <p className="text-sm text-slate-900 dark:text-white">{timestamp}</p>
              </div>
            </div>
          </div>
          
          {/* Hash */}
          <div className="flex items-start justify-between p-4 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <Hash className="w-5 h-5 text-[#4A9FF5] mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 dark:text-white/50 mb-1">Content Hash</p>
                <p className="font-mono text-xs break-all text-slate-600 dark:text-white/70">{hash}</p>
              </div>
            </div>
            <CopyButton text={hash} size="sm" />
          </div>
        </motion.div>
        
        {/* Verification Seal */}
        <motion.div 
          className="flex items-center justify-center gap-2 pt-4 border-t border-black/10 dark:border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <Shield className="w-4 h-4 text-[#F5B942]" />
          <span className="text-xs text-slate-500 dark:text-white/50">
            Secured by VeritasID Blockchain Network
          </span>
        </motion.div>
      </div>
    </GlassCard>
  );
}
