import { Request, Response } from 'express';
import Transaction from '../models/transaction.model';
import { transactionSchema } from '../validations/transaction.validation';
import { z } from 'zod';

class TransactionController {
  // POST /transactions – Add income or expense
  async createTransaction(req: Request, res: Response): Promise<void> {
    try {
      const result = transactionSchema.safeParse(req.body);

      if (!result.success) {
        res.status(400).json({
          status: false,
          msg: 'Validation failed',
          errors: result.error.flatten().fieldErrors,
        });
        return;
      }

      const { type, amount, category, description, date } = result.data;

      const userID = req.user?._id;

      const transaction = new Transaction({
        userID,
        type,
        amount,
        category,
        description,
        date: date || new Date(),
      });

      const saved = await transaction.save();
      res.status(201).json({ status: true, data: saved });
    } catch (error) {
      console.error('ERROR:', error);
      res.status(500).json({ status: false, msg: 'Internal Server Error', error });
    }
  }

  // GET /transactions – List all by category/date with pagination
  async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const userID = req.user?._id || req.query.userID;
      const { category, startDate, endDate, page = '1', limit = '10' } = req.query;

      if (!userID) {
        res.status(400).json({ status: false, msg: 'userID is required' });
        return;
      }

      const query: any = { userID };
      if (category) query.category = category;
      if (startDate || endDate) {
        query.date = {};
        if (startDate) query.date.$gte = new Date(startDate as string);
        if (endDate) query.date.$lte = new Date(endDate as string);
      }

      const pageNum = parseInt(page as string, 10);
      const limitNum = parseInt(limit as string, 10);
      const skip = (pageNum - 1) * limitNum;

      const total = await Transaction.countDocuments(query);
      const transactions = await Transaction.find(query)
        .sort({ date: -1 })
        .skip(skip)
        .limit(limitNum);

      res.status(200).json({
        status: true,
        data: transactions,
        pagination: {
          total,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      console.error('ERROR:', error);
      res.status(500).json({ status: false, msg: 'Error fetching transactions', error });
    }
  }

  // DELETE /transactions/:id
  async deleteTransaction(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const deleted = await Transaction.findByIdAndDelete(id);
      if (!deleted) {
        res.status(404).json({ status: false, msg: 'Transaction not found' });
        return;
      }

      res.status(200).json({ status: true, msg: 'Transaction deleted' });
    } catch (error) {
      console.error('ERROR:', error);
      res.status(500).json({ status: false, msg: 'Error deleting transaction', error });
    }
  }
}

export default new TransactionController();
