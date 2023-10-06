import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Transaction model for type-checking purposes.
interface ITransaction extends Document {
    productId: Schema.Types.ObjectId;
    customerId: Schema.Types.ObjectId;
    agentId: Schema.Types.ObjectId;
    transactionType: 'Buy' | 'Sell';
    buyer: string;
}

const transactionSchema: Schema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    agentId: {
        type: Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    transactionType: {
        type: String,
        enum: ['Buy', 'Sell'],
        required: true
    },
    buyer: {
        type: String,
        required: [true, 'A buyer is required for Sell transactions']
    }
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export default Transaction;
