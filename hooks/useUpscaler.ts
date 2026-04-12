import { useState, useCallback } from 'react';

interface UpscaleResult {
  originalUrl: string;
  upscaledUrl: string;
  processingTime: number;
}

export function useUpscaler() {
  const [result, setResult] = useState<UpscaleResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upscaleImage = useCallback(
    async (imageUrl: string, file: File) => {
      setIsProcessing(true);
      setProgress(0);
      setError(null);

      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('scale', '4');

        // Simulate progress updates
        const progressInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 90) return prev;
            return prev + Math.random() * 20;
          });
        }, 500);

        const response = await fetch('/api/upscale', {
          method: 'POST',
          body: formData,
        });

        clearInterval(progressInterval);

        if (!response.ok) {
          throw new Error('Failed to upscale image');
        }

        const data = await response.json();
        setProgress(100);

        setResult({
          originalUrl: imageUrl,
          upscaledUrl: data.upscaledUrl,
          processingTime: data.processingTime || 0,
        });
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Upscaling failed';
        setError(message);
        console.error('Upscaling error:', err);
      } finally {
        setIsProcessing(false);
        setProgress(0);
      }
    },
    []
  );

  const resetResult = useCallback(() => {
    setResult(null);
    setProgress(0);
    setError(null);
  }, []);

  return {
    result,
    progress,
    isProcessing,
    error,
    upscaleImage,
    resetResult,
  };
}
