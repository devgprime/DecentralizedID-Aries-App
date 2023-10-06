import express from 'express';
import * as customerController from '../controllers/customerController';

const router = express.Router();

router.post('/', customerController.addCustomer);
router.get('/:id', customerController.getCustomer);
router.put('/:id', customerController.updateCustomer);
router.delete('/:id', customerController.deleteCustomer);
router.get('/', customerController.getAllCustomers);

export default router;
