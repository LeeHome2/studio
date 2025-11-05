'use server';

/**
 * @fileOverview Lists the main ingredients found within a given meal.
 *
 * - generateIngredientList - A function that generates a list of ingredients for a given meal.
 * - GenerateIngredientListInput - The input type for the generateIngredientList function.
 * - GenerateIngredientListOutput - The return type for the generateIngredientList function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateIngredientListInputSchema = z.object({
  mealName: z.string().describe('The name of the identified meal.'),
});
export type GenerateIngredientListInput = z.infer<
  typeof GenerateIngredientListInputSchema
>;

const GenerateIngredientListOutputSchema = z.object({
  ingredients: z
    .string()
    .describe('A comma-separated list of the main ingredients in the meal.'),
});
export type GenerateIngredientListOutput = z.infer<
  typeof GenerateIngredientListOutputSchema
>;

export async function generateIngredientList(
  input: GenerateIngredientListInput
): Promise<GenerateIngredientListOutput> {
  return generateIngredientListFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateIngredientListPrompt',
  input: {schema: GenerateIngredientListInputSchema},
  output: {schema: GenerateIngredientListOutputSchema},
  prompt: `You are an expert chef. Please provide a comma-separated list of the main ingredients found in the following meal:

Meal: {{{mealName}}}

Ingredients:`,
});

const generateIngredientListFlow = ai.defineFlow(
  {
    name: 'generateIngredientListFlow',
    inputSchema: GenerateIngredientListInputSchema,
    outputSchema: GenerateIngredientListOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
