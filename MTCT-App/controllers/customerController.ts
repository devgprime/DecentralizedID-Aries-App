import { Request, Response } from 'express';
import Customer from '../models/customer'; // Assume the customer model is exported as default

export const addCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send(customer);
    } catch (error: any) {
        res.status(400).send(error);
    }
};

export const getCustomer = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send();
        res.send(customer);
    } catch (error: any) {
        res.status(500).send(error);
    }
};

export const updateCustomer = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!customer) return res.status(404).send();
        res.send(customer);
    } catch (error: any) {
        res.status(400).send(error);
    }
};

export const deleteCustomer = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const customer = await Customer.findByIdAndDelete(req.params.id);
        if (!customer) return res.status(404).send();
        res.send(customer);
    } catch (error: any) {
        res.status(500).send(error);
    }
};

export const getAllCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const customers = await Customer.find();
        res.status(200).json({
            status: 'success',
            data: {
                customers
            }
        });
    } catch (error: any) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
