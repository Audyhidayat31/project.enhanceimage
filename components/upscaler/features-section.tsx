'use client';

import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Star } from 'lucide-react';

export function FeaturesSection() {
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

  const features = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: 'Super Cepat',
      description: 'Proses dalam hitungan detik dengan teknologi AI canggih. Tidak perlu menunggu lama.'
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-secondary" />,
      title: 'Privasi Terjamin',
      description: 'Gambar Anda tidak disimpan dan langsung dihapus setelah diproses. Aman & terpercaya.'
    },
    {
      icon: <Star className="w-8 h-8 text-primary" />,
      title: 'Hasil Profesional',
      description: 'Deteksi objek akurat dengan peningkatan resolusi yang tajam dan natural. Kualitas setara premium.'
    }
  ];

  return (
    <section id="fitur" className="py-20 border-t border-white/10 mt-12 relative scroll-mt-16">
      <div className="absolute inset-0 bg-primary/5 blur-3xl -z-10" />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-5xl mx-auto px-4"
      >
        <div className="text-center mb-16 space-y-4">
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-foreground">
            Mengapa Memilih Web Enhance Kami?
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
            Solusi terbaik untuk meningkatkan resolusi gambar dengan mudah dan cepat
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass border border-white/10 rounded-2xl p-8 hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
