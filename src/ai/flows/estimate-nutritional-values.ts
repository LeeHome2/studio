'use server';

/**
 * @fileOverview Estimates the nutritional values (calories, protein, fat) of a food item in Korean.
 *
 * - estimateNutritionalValues - A function that estimates nutritional values.
 * - EstimateNutritionalValuesInput - The input type for the estimateNutritionalValues function.
 * - EstimateNutritionalValuesOutput - The return type for the estimateNutritionalValues function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateNutritionalValuesInputSchema = z.object({
  mealName: z.string().describe('The identified meal name.'),
  ingredients: z.array(z.string()).describe('The list of ingredients found in the meal.'),
});
export type EstimateNutritionalValuesInput = z.infer<typeof EstimateNutritionalValuesInputSchema>;

const EstimateNutritionalValuesOutputSchema = z.object({
  calories: z.string().describe('Estimated calorie count of the meal in Korean.'),
  protein: z.string().describe('Estimated protein content of the meal in Korean.'),
  fat: z.string().describe('Estimated fat content of the meal in Korean.'),
});
export type EstimateNutritionalValuesOutput = z.infer<typeof EstimateNutritionalValuesOutputSchema>;

export async function estimateNutritionalValues(input: EstimateNutritionalValuesInput): Promise<EstimateNutritionalValuesOutput> {
  return estimateNutritionalValuesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateNutritionalValuesPrompt',
  input: {schema: EstimateNutritionalValuesInputSchema},
  output: {schema: EstimateNutritionalValuesOutputSchema},
  prompt: `Estimate the nutritional values (calories, protein, fat) for the following meal in Korean.\n\nMeal: {{{mealName}}}\nIngredients: {{#each ingredients}}{{{this}}}, {{/each}}\n\nRespond in Korean.  For each nutritional value, respond with the value and the units. For example: Calories: 500 칼로리`,
});

const estimateNutritionalValuesFlow = ai.defineFlow(
  {
    name: 'estimateNutritionalValuesFlow',
    inputSchema: EstimateNutritionalValuesInputSchema,
    outputSchema: EstimateNutritionalValuesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
