import express from 'express';
import {addSale,  getAllSales} from '../Controllers/SalesController.js';

const router = express.Router();

router.post('/sales' , addSale);
router.get('/sales',  getAllSales);

export default router;