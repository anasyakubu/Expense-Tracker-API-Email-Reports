import express from "express";
const router = express.Router();
import { requireAuth } from "../middleware/authMiddleware";
import TransactionController from '../controllers/transaction.controller';
import { validate } from '../middleware/validate';
import { transactionSchema } from '../validations/transaction.validation';


//*********** New Routes for Social Media Authentication ***********//

router.post('/transactions', requireAuth, validate(transactionSchema), TransactionController.createTransaction);
router.get('/transactions', requireAuth, TransactionController.getTransactions);
router.delete('/transactions/:id', requireAuth, TransactionController.deleteTransaction);

export default router;
