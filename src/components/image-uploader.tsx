'use client';

import { useState, useCallback, type DragEvent } from 'react';
import Image from 'next/image';
import { UploadCloud, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onUpload: (dataUri: string) => void;
  onClear: () => void;
  progress: number;
  isLoading: boolean;
  uploadedImage: string | null;
}

const placeholder = PlaceHolderImages.find(p => p.id === 'food-upload-placeholder');

export function ImageUploader({ onUpload, onClear, progress, isLoading, uploadedImage }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === 'string') {
          onUpload(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  }, [handleFileChange]);

  return (
    <div className="w-full relative">
      <div
        className={cn(
          'relative aspect-video w-full rounded-lg border-2 border-dashed border-border transition-all duration-300 ease-in-out',
          isDragging ? 'border-primary bg-accent/50' : '',
          uploadedImage ? 'border-solid' : 'p-4'
        )}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {uploadedImage ? (
          <>
            <Image
              src={uploadedImage}
              alt="Uploaded food item"
              fill
              className="object-cover rounded-md"
            />
            {!isLoading && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 rounded-full h-8 w-8 z-10"
                onClick={onClear}
                aria-label="Clear image"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
            <div className="flex flex-col items-center justify-center text-center">
              {placeholder && (
                <div className="relative w-48 h-32 mb-4">
                  <Image
                    src={placeholder.imageUrl}
                    alt={placeholder.description}
                    width={192}
                    height={128}
                    className="rounded-md object-cover"
                    data-ai-hint={placeholder.imageHint}
                  />
                </div>
              )}
              <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="font-semibold text-foreground">Drag & drop an image, or click to upload</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, or WEBP</p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept="image/png, image/jpeg, image/webp"
              onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
              disabled={isLoading}
            />
          </label>
        )}
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center rounded-lg">
          <Progress value={progress} className="w-1/2" />
          <p className="mt-2 text-sm font-medium text-foreground animate-pulse">Analyzing your meal...</p>
        </div>
      )}
    </div>
  );
}
