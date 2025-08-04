import { Schema, model, Document } from 'mongoose';
import mongoose from "mongoose";

export interface ITransaction extends Document {
  userID: mongoose.Types.ObjectId;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  date: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    description: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default model<ITransaction>('Transaction', transactionSchema);
