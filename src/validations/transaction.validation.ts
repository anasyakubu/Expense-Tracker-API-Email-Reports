import { z } from 'zod';
import mongoose from 'mongoose';

// Helper: Check if a string is a valid ObjectId
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

export const transactionSchema = z.object({
  // userID: z
  //   .string()
  //   .min(1, 'UserID is required')
  //   .refine(isValidObjectId, { message: 'Invalid MongoDB ObjectId' }),
  type: z.enum(['income', 'expense']),
  amount: z.number().positive('Amount must be a positive number'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().optional(),
  date: z.coerce.date().optional(), // optional ISO date or JS date
});