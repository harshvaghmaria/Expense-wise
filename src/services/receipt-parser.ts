/**
 * Represents the parsed data extracted from a receipt image.
 */
export interface ReceiptData {
  /**
   * The total amount on the receipt.
   */
  amount: number;
  /**
   * The date on the receipt.
   */
  date: string;
  /**
   * The name of the merchant on the receipt.
   */
  merchant: string;
}

/**
 * Asynchronously parses a receipt image and extracts relevant data.
 *
 * @param image The receipt image to parse (e.g., as a base64 encoded string).
 * @returns A promise that resolves to a ReceiptData object containing the extracted data.
 */
export async function parseReceipt(image: string): Promise<ReceiptData> {
  // TODO: Implement this by calling an API.

  return {
    amount: 25.50,
    date: '2024-01-01',
    merchant: 'Coffee Shop',
  };
}
