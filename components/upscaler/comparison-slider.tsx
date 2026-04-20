'use client';

import { motion } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { useState } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Sebelum',
  afterLabel = 'Sesudah',
}: ComparisonSliderProps) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);

  return (
    <>
      {/* Side-by-side comparison container */}
      <motion.div
        className="relative w-full rounded-2xl overflow-hidden glass border border-white/15 electric-glow"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex w-full">
          {/* Before Panel */}
          <div className="relative flex-1 border-r border-white/20">
            {/* Label */}
            <motion.div
              className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full glass-dark text-sm font-semibold text-white shadow"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {beforeLabel}
            </motion.div>
            <img
              src={beforeImage}
              alt={beforeLabel}
              className="w-full h-full object-cover"
              style={{ display: 'block', maxHeight: '480px', minHeight: '220px', objectFit: 'cover' }}
            />
          </div>

          {/* After Panel */}
          <div className="relative flex-1">
            {/* Label */}
            <motion.div
              className="absolute top-3 left-3 z-10 px-3 py-1 rounded-full font-semibold text-sm shadow"
              style={{ background: 'linear-gradient(90deg, var(--primary, #38bdf8), var(--secondary, #818cf8))', color: '#fff' }}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {afterLabel}
            </motion.div>
            <img
              src={afterImage}
              alt={afterLabel}
              className="w-full h-full object-cover"
              style={{ display: 'block', maxHeight: '480px', minHeight: '220px', objectFit: 'cover' }}
            />
            {/* Zoom button */}
            <motion.button
              className="absolute bottom-3 right-3 z-10 w-9 h-9 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/20 transition-colors shadow"
              onClick={() => setZoomedImage(afterImage)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title="Perbesar gambar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <ZoomIn size={18} />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setZoomedImage(null)}
        >
          <motion.img
            src={zoomedImage}
            alt="Zoomed"
            className="max-w-full max-h-full rounded-xl shadow-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white text-2xl font-bold"
            onClick={() => setZoomedImage(null)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </>
  );
}
