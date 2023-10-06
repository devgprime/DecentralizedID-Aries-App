import express from 'express';
import * as productController from '../controllers/productController';

const router = express.Router();

router.post('/', productController.addProduct);
router.get('/:id', productController.getProduct);
router.get('/', productController.getAllProducts);

export default router;
