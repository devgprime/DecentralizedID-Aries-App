import mongoose, { Document, Schema } from 'mongoose';

// Define an interface for the Agent model. This will help with type-checking.
interface IAgent extends Document {
    name: string;
    email: string;
    phoneNumber: string;
    branch: 'HQ' | 'Branch1' | 'Branch2';
    hireDate?: Date;
    // ... you can add type definitions for more fields as required
}

const agentSchema: Schema = new Schema({
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
    phoneNumber: {
        type: String,
        required: true,
        trim: true
    },
    branch: {
        type: String,
        enum: ['HQ', 'Branch1', 'Branch2'], // Assuming there are only two branches aside from HQ
        required: true
    },
    hireDate: {
        type: Date,
        default: Date.now
    }
    // ... you can add more fields as required, such as a performance metric, assigned clients, etc.
});

const Agent = mongoose.model<IAgent>('Agent', agentSchema);

export default Agent;
