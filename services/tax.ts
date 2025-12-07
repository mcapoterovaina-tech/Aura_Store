
import { client } from './config';

export interface TaxCalculationResponse {
  rate: number;
  amount: number;
  currency: string;
}

export const calculateTax = async (subtotal: number, userId?: string): Promise<TaxCalculationResponse> => {
  try {
    const data = await client('/tax/calculate', {
      method: 'POST',
      body: JSON.stringify({ subtotal, userId })
    });

    return data;
  } catch (error) {
    console.warn("API Error (Tax): Tax service offline.", error);
    // Elegant fallback: Return 0 tax if service fails, allowing checkout to proceed.
    return {
      rate: 0,
      amount: 0,
      currency: 'USD'
    };
  }
};
