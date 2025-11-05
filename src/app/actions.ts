'use server';

import { analyzeUploadedFoodImage } from '@/ai/flows/analyze-uploaded-food-image';
import { generateIngredientList } from '@/ai/flows/generate-ingredient-list';
import { estimateNutritionalValues } from '@/ai/flows/estimate-nutritional-values';
import { recommendDietInKorean } from '@/ai/flows/recommend-diet-in-korean';
import { z } from 'zod';

const nutritionAnalysisResultSchema = z.object({
  mealName: z.string(),
  ingredients: z.array(z.string()),
  nutritionalValues: z.object({
    calories: z.string(),
    protein: z.string(),
    fat: z.string(),
  }),
  recommendation: z.string(),
});

export type NutritionAnalysisResult = z.infer<typeof nutritionAnalysisResultSchema>;

export async function getNutritionAnalysis(photoDataUri: string): Promise<NutritionAnalysisResult> {
  try {
    const imageAnalysis = await analyzeUploadedFoodImage({ photoDataUri });
    const mealName = imageAnalysis.mealIdentification;

    const ingredientList = await generateIngredientList({ mealName });
    const ingredients = ingredientList.ingredients.split(',').map(i => i.trim()).filter(i => i);

    const nutritionalValues = await estimateNutritionalValues({ mealName, ingredients });

    // Parse numbers from Korean strings, e.g., "500 칼로리" -> 500
    const calories = parseInt(nutritionalValues.calories, 10) || 0;
    const protein = parseInt(nutritionalValues.protein, 10) || 0;
    const fat = parseInt(nutritionalValues.fat, 10) || 0;

    const dietRecommendation = await recommendDietInKorean({ calories, protein, fat });

    return {
      mealName,
      ingredients,
      nutritionalValues,
      recommendation: dietRecommendation.recommendation,
    };
  } catch (error) {
    console.error("Error in getNutritionAnalysis:", error);
    throw new Error("Failed to analyze nutrition. Please try again.");
  }
}
