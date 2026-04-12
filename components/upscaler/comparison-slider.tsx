'use client';

import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

interface ComparisonSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

export function ComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Original',
  afterLabel = 'Upscaled',
}: ComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition =
      ((e.touches[0].clientX - rect.left) / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, newPosition)));
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden glass border border-white/15 electric-glow"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={() => {}}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative w-full aspect-square md:aspect-video">
        {/* Before Image */}
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* After Image with slider */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={afterImage}
            alt={afterLabel}
            className="w-full h-full object-cover"
            style={{ width: `calc(100% / ${sliderPosition} * 100)` }}
          />
        </div>

        {/* Slider Handle */}
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary cursor-col-resize"
          style={{ left: `${sliderPosition}%` }}
          animate={{ x: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg electric-glow"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="flex gap-1">
              <div className="w-1 h-4 bg-white/80 rounded-full" />
              <div className="w-1 h-4 bg-white/80 rounded-full" />
            </div>
          </motion.div>
        </motion.div>

        {/* Labels */}
        <motion.div
          className="absolute top-4 left-4 px-3 py-1 rounded-lg glass-dark text-sm font-medium text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {beforeLabel}
        </motion.div>

        <motion.div
          className="absolute top-4 right-4 px-3 py-1 rounded-lg glass-dark text-sm font-medium bg-primary/20 text-primary"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {afterLabel}
        </motion.div>
      </div>
    </motion.div>
  );
}
