'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <motion.div
      className="space-y-6 text-center mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex items-center justify-center gap-2"
        variants={itemVariants}
      >
        <div className="relative">
          <div className="absolute inset-0 electric-glow blur-xl rounded-full" />
          <Zap className="relative w-8 h-8 text-primary" />
        </div>
        <span className="text-sm font-semibold text-primary tracking-wider uppercase">
          Enhance Gambar Terbaik
        </span>
      </motion.div>

      <motion.h1
        className="text-5xl md:text-6xl font-bold text-foreground leading-tight"
        variants={itemVariants}
      >
        Tingkatkan Gambar Anda{' '}
        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          dalam Sekejap
        </span>
      </motion.h1>

      <motion.p
        className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        variants={itemVariants}
      >
        Upload gambar Anda dan biarkan AI meningkatkan resolusinya secara otomatis. Gratis, cepat, dan hasil profesional.
      </motion.p>

      <motion.div
        className="flex items-center justify-center gap-4 pt-4 flex-wrap"
        variants={itemVariants}
      >
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/15">
          <Sparkles size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">100% Gratis</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/15">
          <Zap size={16} className="text-secondary" />
          <span className="text-sm font-medium text-foreground">&lt;5s Proses</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/15">
          <div className="font-bold text-primary text-sm">HD</div>
          <span className="text-sm font-medium text-foreground">Kualitas</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
