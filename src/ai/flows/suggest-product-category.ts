// src/ai/flows/suggest-product-category.ts
'use server';

/**
 * @fileOverview An AI agent that suggests product categories based on the product name.
 *
 * - suggestProductCategory - A function that suggests a category for a product.
 * - SuggestProductCategoryInput - The input type for the suggestProductCategory function.
 * - SuggestProductCategoryOutput - The return type for the suggestProductCategory function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestProductCategoryInputSchema = z.object({
  productName: z
    .string()
    .describe('The name of the product for which to suggest a category.'),
});
export type SuggestProductCategoryInput = z.infer<
  typeof SuggestProductCategoryInputSchema
>;

const SuggestProductCategoryOutputSchema = z.object({
  categorySuggestion: z
    .string()
    .describe('The suggested category for the product.'),
});
export type SuggestProductCategoryOutput = z.infer<
  typeof SuggestProductCategoryOutputSchema
>;

export async function suggestProductCategory(
  input: SuggestProductCategoryInput
): Promise<SuggestProductCategoryOutput> {
  return suggestProductCategoryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestProductCategoryPrompt',
  input: {schema: SuggestProductCategoryInputSchema},
  output: {schema: SuggestProductCategoryOutputSchema},
  prompt: `Suggest a product category for the following product name: {{{productName}}}. Return ONLY the suggested product category.`, 
});

const suggestProductCategoryFlow = ai.defineFlow(
  {
    name: 'suggestProductCategoryFlow',
    inputSchema: SuggestProductCategoryInputSchema,
    outputSchema: SuggestProductCategoryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
