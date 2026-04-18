import { useState, useCallback, useRef } from 'react';

interface UpscaleResult {
  originalUrl: string;
  upscaledUrl: string;
  processingTime: number;
  upscaledSize?: string;
}

interface UpscaleApiResponse {
  upscaledUrl?: string;
  processingTime?: number;
  upscaledSize?: string;
  error?: string;
}

export function useUpscaler() {
  const [result, setResult] = useState<UpscaleResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopProgressInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const upscaleImage = useCallback(async (imageUrl: string, file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setResult(null);

    // Animate progress: quickly reach 30%, then slowly crawl to 90%
    let currentProgress = 0;
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) return prev;
        const increment = prev < 30 ? 5 : prev < 60 ? 2 : 0.5;
        currentProgress = Math.min(prev + increment, 90);
        return currentProgress;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('scale', '4');

      const response = await fetch('/api/upscale', {
        method: 'POST',
        body: formData,
      });

      stopProgressInterval();

      const data: UpscaleApiResponse = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (!data.upscaledUrl) {
        throw new Error('Server tidak mengembalikan gambar hasil.');
      }

      // Jump to 100%
      setProgress(100);

      setResult({
        originalUrl: imageUrl,
        upscaledUrl: data.upscaledUrl,
        processingTime: data.processingTime || 0,
        upscaledSize: data.upscaledSize,
      });
    } catch (err) {
      stopProgressInterval();
      setProgress(0);
      const message =
        err instanceof Error ? err.message : 'Terjadi kesalahan saat upscaling';
      setError(message);
      console.error('Upscaling error:', err);
    } finally {
      stopProgressInterval();
      setIsProcessing(false);
    }
  }, []);

  const resetResult = useCallback(() => {
    stopProgressInterval();
    setResult(null);
    setProgress(0);
    setError(null);
    setIsProcessing(false);
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
