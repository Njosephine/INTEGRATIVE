import express from 'express';
import { getAllSuppliers, addSupplier } from '../Controllers/SupplierContoller.js';

const router = express.Router();

// Route to retrieve all categories
router.get('/suppliers', getAllSuppliers);

// Route to add a new category
router.post('/suppliers', addSupplier);

export default router;