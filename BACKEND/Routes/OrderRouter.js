import express from 'express';
import {addOrder, getAllOrders, getTotalOrders } from '../Controllers/OrderController.js';

const router = express.Router();

router.post('/orders' ,addOrder );
router.get('/orders',  getAllOrders);
router.get('/total', getTotalOrders);
export default router;