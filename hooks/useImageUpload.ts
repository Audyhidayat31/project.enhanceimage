import { useState, useCallback } from 'react';

interface UploadResult {
  file: File;
  preview: string;
  width: number;
  height: number;
  size: number;
}

export function useImageUpload() {
  const [uploadedImage, setUploadedImage] = useState<UploadResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const uploadImage = useCallback((file: File) => {
    setError(null);

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file');
      return;
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 10MB');
      return;
    }

    setIsLoading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage({
          file,
          preview: e.target?.result as string,
          width: img.width,
          height: img.height,
          size: file.size,
        });
        setIsLoading(false);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }, []);

  const resetImage = useCallback(() => {
    setUploadedImage(null);
    setError(null);
  }, []);

  return {
    uploadedImage,
    error,
    isLoading,
    uploadImage,
    resetImage,
  };
}
