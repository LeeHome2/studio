'use client';

import type { NutritionAnalysisResult } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Flame, Beef, Droplets, NotebookText, HeartPulse } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ResultsDisplayProps {
  result: NutritionAnalysisResult | null;
  isLoading: boolean;
}

const NutritionFact = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
  <div className="flex items-center space-x-4 p-4 bg-background rounded-lg">
    <div className="p-3 rounded-full bg-primary/20 text-primary-foreground">{icon}</div>
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  </div>
);

export function ResultsDisplay({ result, isLoading }: ResultsDisplayProps) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 border border-dashed rounded-lg bg-background/50">
        <NotebookText className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-xl font-semibold text-foreground">Your Nutrition Report</h3>
        <p className="text-muted-foreground mt-2">Upload an image of your meal to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <h2 className="text-3xl font-bold tracking-tight text-foreground">{result.mealName}</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Flame className="w-5 h-5 text-accent" />
            Nutrition Facts
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NutritionFact icon={<Flame className="h-6 w-6" />} label="Calories" value={result.nutritionalValues.calories} />
          <NutritionFact icon={<Beef className="h-6 w-6" />} label="Protein" value={result.nutritionalValues.protein} />
          <NutritionFact icon={<Droplets className="h-6 w-6" />} label="Fat" value={result.nutritionalValues.fat} />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <NotebookText className="w-5 h-5 text-accent" />
            Main Ingredients
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {result.ingredients.map((ingredient, index) => (
            <Badge key={index} variant="secondary" className="text-sm px-3 py-1">{ingredient}</Badge>
          ))}
        </CardContent>
      </Card>
      
      <Card className="bg-primary/10 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <HeartPulse className="w-5 h-5 text-accent" />
            Dietary Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-foreground leading-relaxed">{result.recommendation}</p>
        </CardContent>
      </Card>
    </div>
  );
}
