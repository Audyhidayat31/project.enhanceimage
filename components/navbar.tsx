'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full border-b border-white/10 glass bg-background/60 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-primary font-bold text-xl hover:opacity-80 transition-opacity"
        >
          <Sparkles className="w-6 h-6" /> 
          Enhancer
        </a>
        
        <div className="flex items-center gap-6 text-sm font-medium">
          <a 
            href="#fitur" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('fitur')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Fitur
          </a>
          <a 
            href="#cara-kerja" 
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('cara-kerja')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Cara Kerja
          </a>
        </div>
      </div>
    </motion.nav>
  );
}
