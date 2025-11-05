'use server';
/**
 * @fileOverview Provides diet recommendations in Korean based on the nutritional balance of a meal.
 *
 * - recommendDietInKorean - A function that takes nutritional information and provides a diet recommendation in Korean.
 * - RecommendDietInput - The input type for the recommendDietInKorean function.
 * - RecommendDietOutput - The return type for the recommendDietInKorean function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendDietInputSchema = z.object({
  calories: z.number().describe('The estimated calorie count of the meal.'),
  protein: z.number().describe('The estimated protein content of the meal (in grams).'),
  fat: z.number().describe('The estimated fat content of the meal (in grams).'),
});
export type RecommendDietInput = z.infer<typeof RecommendDietInputSchema>;

const RecommendDietOutputSchema = z.object({
  recommendation: z.string().describe('Dietary recommendation in Korean based on the meal composition.'),
});
export type RecommendDietOutput = z.infer<typeof RecommendDietOutputSchema>;

export async function recommendDietInKorean(input: RecommendDietInput): Promise<RecommendDietOutput> {
  return recommendDietInKoreanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendDietInKoreanPrompt',
  input: {schema: RecommendDietInputSchema},
  output: {schema: RecommendDietOutputSchema},
  prompt: `You are a nutrition expert providing diet recommendations in Korean.

  Based on the following nutritional information, provide a concise diet recommendation in Korean.
  Consider the balance of the macronutrients (calories, protein, and fat) when making your recommendation. Specifically suggest how to balance the meal.

  Calories: {{{calories}}} kcal
  Protein: {{{protein}}} g
  Fat: {{{fat}}} g

  Recommendation (in Korean):`,
});

const recommendDietInKoreanFlow = ai.defineFlow(
  {
    name: 'recommendDietInKoreanFlow',
    inputSchema: RecommendDietInputSchema,
    outputSchema: RecommendDietOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
