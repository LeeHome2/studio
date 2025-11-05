'use server';

/**
 * @fileOverview Analyzes an uploaded food image to identify the meal.
 *
 * - analyzeUploadedFoodImage - A function that handles the food image analysis process.
 * - AnalyzeUploadedFoodImageInput - The input type for the analyzeUploadedFoodImage function.
 * - AnalyzeUploadedFoodImageOutput - The return type for the analyzeUploadedFoodImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeUploadedFoodImageInputSchema = z.object({
  photoDataUri: z
    .string()
    .describe(
      "A photo of a meal, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type AnalyzeUploadedFoodImageInput = z.infer<
  typeof AnalyzeUploadedFoodImageInputSchema
>;

const AnalyzeUploadedFoodImageOutputSchema = z.object({
  mealIdentification: z
    .string()
    .describe('The identified meal from the uploaded image.'),
});
export type AnalyzeUploadedFoodImageOutput = z.infer<
  typeof AnalyzeUploadedFoodImageOutputSchema
>;

export async function analyzeUploadedFoodImage(
  input: AnalyzeUploadedFoodImageInput
): Promise<AnalyzeUploadedFoodImageOutput> {
  return analyzeUploadedFoodImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeUploadedFoodImagePrompt',
  input: {schema: AnalyzeUploadedFoodImageInputSchema},
  output: {schema: AnalyzeUploadedFoodImageOutputSchema},
  prompt: `You are an expert food identifier. You will identify the meal in the photo.

  Photo: {{media url=photoDataUri}}
  \n
  Identify the meal:`,
});

const analyzeUploadedFoodImageFlow = ai.defineFlow(
  {
    name: 'analyzeUploadedFoodImageFlow',
    inputSchema: AnalyzeUploadedFoodImageInputSchema,
    outputSchema: AnalyzeUploadedFoodImageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
