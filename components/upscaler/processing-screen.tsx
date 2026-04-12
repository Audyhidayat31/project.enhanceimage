'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface ProcessingScreenProps {
  progress: number;
}

export function ProcessingScreen({ progress }: ProcessingScreenProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="glass border border-white/15 rounded-3xl p-8 max-w-md mx-4 space-y-8"
        variants={itemVariants}
      >
        {/* Icon */}
        <motion.div
          className="flex justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <Sparkles className="w-12 h-12 text-primary" />
        </motion.div>

        {/* Text */}
        <motion.div
          className="text-center space-y-3"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-bold text-foreground">
            Meningkatkan Resolusi Gambar
          </h2>
          <p className="text-muted-foreground">
            Menggunakan AI canggih untuk meningkatkan kualitas gambar Anda...
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div className="space-y-3" variants={itemVariants}>
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Memproses</span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}%
            </span>
          </div>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          className="flex justify-center gap-2"
          variants={itemVariants}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary"
              animate={{ y: [0, -8, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
