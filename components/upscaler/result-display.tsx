'use client';

import { motion } from 'framer-motion';
import { Check, Zap } from 'lucide-react';

interface ResultDisplayProps {
  originalSize: string;
  upscaledSize: string;
  quality: string;
}

export function ResultDisplay({
  originalSize,
  upscaledSize,
  quality,
}: ResultDisplayProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="grid md:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Original Size */}
      <motion.div
        className="glass border border-white/15 rounded-xl p-4 space-y-2"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <Check size={18} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Ukuran Asli</span>
        </div>
        <p className="text-2xl font-bold text-foreground">{originalSize}</p>
      </motion.div>

      {/* Upscaled Size */}
      <motion.div
        className="glass border border-white/15 rounded-xl p-4 space-y-2 ring-2 ring-primary/50"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <Zap size={18} className="text-primary" />
          <span className="text-sm text-primary font-semibold">Ukuran Ditingkatkan</span>
        </div>
        <p className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          {upscaledSize}
        </p>
      </motion.div>

      {/* Quality */}
      <motion.div
        className="glass border border-white/15 rounded-xl p-4 space-y-2"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2">
          <Check size={18} className="text-secondary" />
          <span className="text-sm text-muted-foreground">Kualitas</span>
        </div>
        <p className="text-2xl font-bold text-secondary">{quality}</p>
      </motion.div>
    </motion.div>
  );
}
