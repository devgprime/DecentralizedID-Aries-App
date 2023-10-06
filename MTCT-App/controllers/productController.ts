import { Request, Response } from 'express';
import Product from '../models/product';

export const addProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const product = new Product(req.body);
        await product.save();
        return res.status(201).send(product);
    } catch (error: any) {
        return res.status(400).send(error);
    }
};

export const getProduct = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send();
        return res.send(product);
    } catch (error: any) {
        return res.status(500).send(error);
    }
};

export const getAllProducts = async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            status: 'success',
            data: {
                products
            }
        });
    } catch (error: any) {
        return res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
};
