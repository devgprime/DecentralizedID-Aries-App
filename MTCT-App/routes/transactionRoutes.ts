import express from 'express';
import * as transactionController from '../controllers/transactionController';

const router = express.Router();

// Route to get a specific transaction by its ID
router.get('/:id', transactionController.getTransaction);

// Route to get all transactions
router.get('/', transactionController.getAllTransactions);

// Route to record a new transaction
router.post('/', transactionController.recordTransaction);

export default router;
