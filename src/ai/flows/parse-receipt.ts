'use server';
/**
 * @fileOverview A receipt parsing AI agent.
 *
 * - parseReceiptData - A function that handles the receipt parsing process.
 * - ParseReceiptDataInput - The input type for the parseReceiptData function.
 * - ParseReceiptDataOutput - The return type for the parseReceiptData function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ParseReceiptDataInputSchema = z.object({
  image: z.string().describe('The receipt image to parse (e.g., as a base64 encoded string).'),
});
export type ParseReceiptDataInput = z.infer<typeof ParseReceiptDataInputSchema>;

const ParseReceiptDataOutputSchema = z.object({
  amount: z.number().describe('The total amount on the receipt.'),
  date: z.string().describe('The date on the receipt.'),
  merchant: z.string().describe('The name of the merchant on the receipt.'),
});
export type ParseReceiptDataOutput = z.infer<typeof ParseReceiptDataOutputSchema>;

export async function parseReceiptData(input: ParseReceiptDataInput): Promise<ParseReceiptDataOutput> {
  return parseReceiptDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'parseReceiptDataPrompt',
  input: {
    schema: z.object({
      image: z.string().describe('The receipt image to parse (e.g., as a base64 encoded string).'),
    }),
  },
  output: {
    schema: z.object({
      amount: z.number().describe('The total amount on the receipt.'),
      date: z.string().describe('The date on the receipt.'),
      merchant: z.string().describe('The name of the merchant on the receipt.'),
    }),
  },
  prompt: `You are an expert financial assistant specializing in extracting information from receipts.

You will use the receipt image to extract the amount, date, and merchant.

Return the extracted information in JSON format.

Receipt Image: {{media url=image}}`,
});

const parseReceiptDataFlow = ai.defineFlow<
  typeof ParseReceiptDataInputSchema,
  typeof ParseReceiptDataOutputSchema
>(
  {
    name: 'parseReceiptDataFlow',
    inputSchema: ParseReceiptDataInputSchema,
    outputSchema: ParseReceiptDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
