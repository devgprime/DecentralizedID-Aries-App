import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Product model. This helps with type-checking.
interface IProduct extends Document {
    name: string;
    description?: string;  // Optional since not all products might have a description
    price: number;
    category: string;
    riskLevel: 'Low' | 'Medium' | 'High';
    startDate?: Date;
    maturityDate?: Date;
    owner?: string;  // Optional because a default value is provided in the schema
}

const productSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    riskLevel: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        required: true
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    maturityDate: {
        type: Date
    },
    owner: {
        type: String,
        default: 'MTCT'
    }
    
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
