'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HeroSection } from '@/components/upscaler/hero-section';
import { UploadArea } from '@/components/upscaler/upload-area';
import { Navbar } from '@/components/navbar';
import { ComparisonSlider } from '@/components/upscaler/comparison-slider';
import { ProcessingScreen } from '@/components/upscaler/processing-screen';
import { ActionButtons } from '@/components/upscaler/action-buttons';
import { ResultDisplay } from '@/components/upscaler/result-display';
import { FeaturesSection } from '@/components/upscaler/features-section';
import { HowItWorksSection } from '@/components/upscaler/how-it-works-section';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useUpscaler } from '@/hooks/useUpscaler';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function Home() {
  const { uploadedImage, error: uploadError, uploadImage, resetImage } = useImageUpload();
  const {
    result,
    progress,
    isProcessing,
    error: upscaleError,
    upscaleImage,
    resetResult,
  } = useUpscaler();

  const handleUpload = (file: File) => {
    uploadImage(file);
  };

  const handleUpscale = () => {
    if (uploadedImage) {
      upscaleImage(uploadedImage.preview, uploadedImage.file);
    }
  };

  const handleDownload = () => {
    if (result?.upscaledUrl) {
      const link = document.createElement('a');
      link.href = result.upscaledUrl;
      link.download = 'upscaled-image.png';
      link.click();
    }
  };

  const handleShare = () => {
    if (navigator.share && result?.upscaledUrl) {
      navigator.share({
        title: 'Upscaled Image',
        text: 'Check out my upscaled image!',
      });
    } else {
      // Fallback: copy to clipboard
      if (result?.upscaledUrl) {
        navigator.clipboard.writeText(result.upscaledUrl);
        alert('Image URL copied to clipboard!');
      }
    }
  };

  const handleReset = () => {
    resetImage();
    resetResult();
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      {/* Background gradient effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
        {/* Hero Section */}
        <HeroSection />

        {/* Main Content */}
        <AnimatePresence mode="wait">
          {!uploadedImage && !result ? (
            // Upload Stage
            <motion.div
              id="upload-area"
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6 scroll-mt-24"
            >
              <UploadArea onUpload={handleUpload} isLoading={isProcessing} />

              {uploadError && (
                <motion.div
                  className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {uploadError}
                </motion.div>
              )}
            </motion.div>
          ) : uploadedImage && !result ? (
            // Preview & Upscale Stage
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Pratinjau Gambar Anda
                </h2>
                <motion.div
                  className="w-full rounded-2xl overflow-hidden glass border border-white/15 electric-glow"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <img
                    src={uploadedImage.preview}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-cover"
                  />
                </motion.div>

                <motion.div
                  className="grid md:grid-cols-3 gap-4 text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="glass border border-glass-border rounded-lg p-3 space-y-1">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">
                      Dimensi
                    </span>
                    <p className="text-foreground font-semibold">
                      {uploadedImage.width} × {uploadedImage.height}px
                    </p>
                  </div>
                  <div className="glass border border-glass-border rounded-lg p-3 space-y-1">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">
                      Ukuran File
                    </span>
                    <p className="text-foreground font-semibold">
                      {formatFileSize(uploadedImage.size)}
                    </p>
                  </div>
                  <div className="glass border border-glass-border rounded-lg p-3 space-y-1">
                    <span className="text-muted-foreground text-xs uppercase tracking-wider">
                      Faktor Peningkatan
                    </span>
                    <p className="text-foreground font-semibold">4x</p>
                  </div>
                </motion.div>
              </div>

              <motion.button
                onClick={handleUpscale}
                disabled={isProcessing}
                className="w-full py-4 rounded-xl font-bold text-lg text-black bg-gradient-to-r from-primary to-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-primary/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {isProcessing ? 'Memproses...' : 'Mulai Tingkatkan'}
              </motion.button>
            </motion.div>
          ) : result ? (
            // Results Stage
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Gambar Anda yang Ditingkatkan
                </h2>
                <ComparisonSlider
                  beforeImage={result.originalUrl}
                  afterImage={result.upscaledUrl}
                />
              </div>

              <ResultDisplay
                originalSize={`${uploadedImage?.width}×${uploadedImage?.height}`}
                upscaledSize={`${(uploadedImage?.width || 0) * 4}×${(uploadedImage?.height || 0) * 4}`}
                quality="4x Ultra"
              />

              <ActionButtons
                onDownload={handleDownload}
                onShare={handleShare}
                onReset={handleReset}
                isLoading={isProcessing}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        
        {/* New sections modeled after removedbg */}
        {!result && !uploadedImage && (
          <>
            <FeaturesSection />
            <HowItWorksSection />
          </>
        )}

        {/* Error Display */}
        {upscaleError && (
          <motion.div
            className="fixed bottom-4 right-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive max-w-sm z-50 shadow-lg"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <div className="space-y-2">
                <p className="font-semibold text-sm">Gagal memproses gambar</p>
                <p className="text-xs opacity-80">{upscaleError}</p>
                {uploadedImage && (
                  <button
                    onClick={handleUpscale}
                    className="flex items-center gap-1.5 text-xs font-medium underline underline-offset-2 hover:opacity-70 transition-opacity"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Coba lagi
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Processing Modal */}
      <AnimatePresence>
        {isProcessing && <ProcessingScreen progress={progress} />}
      </AnimatePresence>
    </main>
  );
}
