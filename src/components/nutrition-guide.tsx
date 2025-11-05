'use client';

import { useState, useEffect } from 'react';
import { getNutritionAnalysis, type NutritionAnalysisResult } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { ImageUploader } from '@/components/image-uploader';
import { ResultsDisplay } from '@/components/results-display';
import { Logo } from '@/components/logo';

export function NutritionGuide() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<NutritionAnalysisResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isLoading) {
      setProgress(0);
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 95) {
            clearInterval(interval);
            return 95;
          }
          const increment = Math.random() * 10;
          return Math.min(prev + increment, 95);
        });
      }, 300);
    } else {
      if (result || error) {
        setProgress(100);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, result, error]);

  const handleAnalysis = async (dataUri: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    setUploadedImage(dataUri);

    try {
      const analysisResult = await getNutritionAnalysis(dataUri);
      setResult(analysisResult);
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      toast({
        title: 'Analysis Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setUploadedImage(null);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  return (
    <div className="min-h-screen w-full bg-background font-body text-foreground">
      <header className="p-4 border-b border-border/50">
        <div className="container mx-auto flex items-center gap-3">
          <Logo className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground font-headline">
            Nutrition Guide
          </h1>
        </div>
      </header>
      <main className="container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground font-headline">Analyze Your Meal</h2>
            <p className="text-muted-foreground">
              Upload a photo of your food, and our AI will provide a detailed nutritional analysis and recommendations.
            </p>
            <ImageUploader 
              onUpload={handleAnalysis} 
              onClear={handleClear}
              progress={progress}
              isLoading={isLoading}
              uploadedImage={uploadedImage}
            />
          </div>
          <div className="lg:mt-16">
            <ResultsDisplay result={result} isLoading={isLoading} />
          </div>
        </div>
      </main>
      <footer className="py-6 mt-8 border-t border-border/50">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>Powered by AI. Nutritional information is an estimate and should not be considered medical advice.</p>
        </div>
      </footer>
    </div>
  );
}
