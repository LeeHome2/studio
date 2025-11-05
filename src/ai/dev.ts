import { config } from 'dotenv';
config();

import '@/ai/flows/generate-ingredient-list.ts';
import '@/ai/flows/analyze-uploaded-food-image.ts';
import '@/ai/flows/recommend-diet-in-korean.ts';
import '@/ai/flows/estimate-nutritional-values.ts';