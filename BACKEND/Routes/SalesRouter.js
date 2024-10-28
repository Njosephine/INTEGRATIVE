import express from 'express';
import {addSale,  getAllSales, updateSale, getTotalSales} from '../Controllers/SalesController.js';

const router = express.Router();

router.post('/sales' , addSale);
router.get('/sales',  getAllSales);
router.put('/update/:id', updateSale)
router.get('/total', getTotalSales)

export default router;