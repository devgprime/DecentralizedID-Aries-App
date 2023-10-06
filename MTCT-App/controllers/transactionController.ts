import { Request, Response } from 'express';
import Transaction from '../models/transaction';
import Product from '../models/product';

// Get a transaction by ID
export const getTransaction = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate('customerId productId');
        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found.' });
        }
        res.json(transaction);
    } catch (error) {
        res.status(500).json(error);
    }
};

// List all transactions (optional, but could be helpful for dashboards or similar purposes)
export const listTransactions = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const transactions = await Transaction.find({}).populate('customerId productId');
        res.json(transactions);
    } catch (error) {
        res.status(500).json(error);
    }
};

export const getAllTransactions = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const transactions = await Transaction.find();
        res.status(200).json({
            status: 'success',
            data: {
                transactions
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};

export const recordTransaction = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const newTransaction = await Transaction.create(req.body);

        // Handle 'Buy' transaction type
        if (newTransaction.transactionType === 'Buy') {
            await Product.findByIdAndUpdate(
                newTransaction.productId,
                { owner: newTransaction.customerId.toString() },
                { new: true, runValidators: true }
            );
        }
        
        // Handle 'Sell' transaction type
        if (newTransaction.transactionType === 'Sell') {
            // Check if the product is being sold back to MTCT
            if (newTransaction.buyer === 'MTCT') {
                await Product.findByIdAndUpdate(
                    newTransaction.productId,
                    { owner: 'MTCT' },
                    { new: true, runValidators: true }
                );
            } else {
                // If the product is sold to another customer, update the product's owner to the new customer
                await Product.findByIdAndUpdate(
                    newTransaction.productId,
                    { owner: newTransaction.buyer },
                    { new: true, runValidators: true }
                );
            }
        }

        res.status(201).json({
            status: 'success',
            data: {
                transaction: newTransaction
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
