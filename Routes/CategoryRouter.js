import express from 'express';
import { getAllCategories, addCategory } from '../Controllers/CategoryController.js';

const router = express.Router();

// Route to retrieve all categories
router.get('/categories', getAllCategories);

// Route to add a new category
router.post('/categories', addCategory);

export default router;
