import express, { Express } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import customerRoutes from './routes/customerRoutes';
import productRoutes from './routes/productRoutes';
import agentRoutes from './routes/agentRoutes';
import transactionRoutes from './routes/transactionRoutes';
import {dbConfig} from './config/database';

const app: Express = express();

// Database connection
mongoose.connect(dbConfig.url).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// Middlewares
app.use(bodyParser.json());

// Routes
app.use('/customers', customerRoutes);
app.use('/products', productRoutes);
app.use('/agents', agentRoutes);
app.use('/transactions', transactionRoutes);

const PORT: number = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
