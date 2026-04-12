'use client';

import { motion } from 'framer-motion';
import { Upload, Sparkles } from 'lucide-react';
import { useRef } from 'react';

interface UploadAreaProps {
  onUpload: (file: File) => void;
  isLoading?: boolean;
}

export function UploadArea({ onUpload, isLoading }: UploadAreaProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current) {
      dragRef.current.classList.add('border-primary', 'bg-primary/5');
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current) {
      dragRef.current.classList.remove('border-primary', 'bg-primary/5');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (dragRef.current) {
      dragRef.current.classList.remove('border-primary', 'bg-primary/5');
    }

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onUpload(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onUpload(files[0]);
    }
  };

  return (
    <motion.div
      ref={dragRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className="relative w-full rounded-2xl border-2 border-dashed border-muted-foreground/30 glass transition-colors duration-300 cursor-pointer hover:border-primary/50"
      onClick={() => !isLoading && fileInputRef.current?.click()}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isLoading}
      />

      <div className="px-8 py-16 flex flex-col items-center justify-center space-y-6">
        <motion.div
          animate={{ y: isLoading ? 0 : [-10, 10, -10] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="relative"
        >
          <div className="absolute inset-0 electric-glow rounded-full blur-2xl" />
          <Upload
            size={48}
            className="relative text-primary"
            strokeWidth={1.5}
          />
        </motion.div>

        <div className="space-y-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-2xl font-semibold text-foreground">
              Upload Gambar Anda
            </h3>
            <Sparkles size={24} className="text-primary" />
          </div>
          <p className="text-muted-foreground">
            Seret & lepas gambar di sini atau klik untuk memilih file dari perangkat Anda.<br />
            Mendukung format JPG, PNG, dan WebP.
          </p>
        </div>

        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg glass border border-white/15"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Siap ditingkatkan</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
