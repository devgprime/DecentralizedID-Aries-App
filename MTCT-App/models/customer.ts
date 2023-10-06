import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Customer model. This helps with type-checking.
interface ICustomer extends Document {
    name: string;
    email: string;
    dateOfBirth: Date;
    address: string;
    phoneNumber: string;
    kycStatus?: boolean;  // Optional because a default value is provided in the schema
}

const customerSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value: string) {
            if (!value.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
                throw new Error('Invalid email address');
            }
        }
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    kycStatus: {
        type: Boolean,
        default: false
    }
});

const Customer = mongoose.model<ICustomer>('Customer', customerSchema);

export default Customer;
