import express from 'express';
import { sendEmail } from '../utils/sendEmail';
import Transaction from '../models/transaction.model'; // adjust your path
import { requireAuth } from "../middleware/authMiddleware"; // JWT middleware

const router = express.Router();

router.post('/send', requireAuth, async (req, res) => {
  try {

    const userID = req.user?._id;
    const { email } = req.body;

    const transactions = await Transaction.find({ userID: userID });

    const reportHTML = `
      <h2>Monthly Expense Report</h2>
      <ul>
        ${transactions.map(tx => `
          <li>
            <strong>${tx.type.toUpperCase()}</strong>: ₦${tx.amount} — ${tx.category}
          </li>
        `).join('')}
      </ul>
    `;

    // console.log(reportHTML); // for debugging (1)

    await sendEmail(email, 'Your Monthly Expense Report', reportHTML);

    res.json({ message: 'Report sent successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not send report' });
  }
});

export default router;
