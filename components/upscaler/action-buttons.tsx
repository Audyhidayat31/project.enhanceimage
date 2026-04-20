'use client';

import { motion } from 'framer-motion';
import { Download, Share2, RotateCcw, Home } from 'lucide-react';

interface ActionButtonsProps {
  onDownload: () => void;
  onShare: () => void;
  onReset: () => void;
  onGoHome: () => void;
  isLoading?: boolean;
}

export function ActionButtons({
  onDownload,
  onShare,
  onReset,
  onGoHome,
  isLoading,
}: ActionButtonsProps) {
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

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-4 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Download Button */}
      <motion.button
        onClick={onDownload}
        disabled={isLoading}
        className="flex-1 relative group px-6 py-3 rounded-xl font-semibold text-foreground-foreground bg-gradient-to-r from-primary to-secondary disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        variants={buttonVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex items-center justify-center gap-2">
          <Download size={20} />
          <span>Download</span>
        </div>
      </motion.button>

      {/* Share Button */}
      <motion.button
        onClick={onShare}
        disabled={isLoading}
        className="flex-1 px-6 py-3 rounded-xl font-semibold text-foreground border border-white/15 glass disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50 transition-colors"
        variants={buttonVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Share2 size={20} />
          <span>Bagikan</span>
        </div>
      </motion.button>

      {/* Reset Button */}
      <motion.button
        onClick={onReset}
        disabled={isLoading}
        className="px-6 py-3 rounded-xl font-semibold text-muted-foreground border border-white/15 glass disabled:opacity-50 disabled:cursor-not-allowed hover:border-secondary/50 transition-colors"
        variants={buttonVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-2">
          <RotateCcw size={20} />
          <span>Ulangi</span>
        </div>
      </motion.button>

      {/* Go Home Button */}
      <motion.button
        onClick={onGoHome}
        disabled={isLoading}
        className="px-6 py-3 rounded-xl font-semibold text-foreground border border-primary/40 glass disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:bg-primary/10 transition-all"
        variants={buttonVariants}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center justify-center gap-2">
          <Home size={20} className="text-primary" />
          <span>Halaman Utama</span>
        </div>
      </motion.button>
    </motion.div>
  );
}
