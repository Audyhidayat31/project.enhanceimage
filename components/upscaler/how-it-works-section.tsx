'use client';

import { motion } from 'framer-motion';
import { UploadCloud, Cpu, Download } from 'lucide-react';

export function HowItWorksSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-primary" />,
      title: 'Upload Gambar',
      description: 'Seret & lepas atau pilih gambar dari perangkat Anda. Mendukung format JPG, PNG, dan WebP.'
    },
    {
      icon: <Cpu className="w-8 h-8 text-secondary" />,
      title: 'Proses Otomatis',
      description: 'AI akan mendeteksi dan meningkatkan resolusi gambar secara otomatis dalam hitungan detik.'
    },
    {
      icon: <Download className="w-8 h-8 text-primary" />,
      title: 'Download Hasil',
      description: 'Unduh gambar dengan tajam berkualitas tinggi untuk kebutuhan Anda.'
    }
  ];

  return (
    <section id="cara-kerja" className="py-20 border-t border-white/10 relative scroll-mt-16">
      <div className="absolute inset-0 bg-secondary/5 blur-3xl -z-10" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="text-center mb-16 space-y-4">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-foreground">
            Cara Kerja Secara Umum
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
            Hanya 3 langkah mudah untuk mendapatkan gambar berkualitas tinggi
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-12 left-[20%] right-[20%] h-[2px] bg-gradient-to-r from-primary/10 via-secondary/30 to-primary/10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative flex flex-col items-center text-center space-y-4 z-10"
            >
              <div className="w-24 h-24 rounded-full glass border border-white/15 flex items-center justify-center bg-background mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={itemVariants} className="mt-20 text-center space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Siap Meningkatkan Kualitas Gambar?</h3>
          <p className="text-muted-foreground mb-8">Mulai sekarang dan rasakan kemudahan meningkatkan gambar dengan AI</p>
          <button
            onClick={() => document.getElementById('upload-area')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 rounded-xl font-bold text-lg text-black bg-gradient-to-r from-primary to-secondary hover:shadow-lg hover:shadow-primary/50 transition-all transform hover:scale-105"
          >
            Coba Sekarang — Gratis
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
