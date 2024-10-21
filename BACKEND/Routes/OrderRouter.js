import express from 'express';
import {addOrder, getAllOrders} from '../Controllers/OrderController.js';

const router = express.Router();

router.post('/orders' ,addOrder );
router.get('/orders',  getAllOrders);

export default router;