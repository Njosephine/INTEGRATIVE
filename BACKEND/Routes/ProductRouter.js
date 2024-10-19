import express from 'express';
import {addProduct, getAllProducts, getProductById, getProductsByCategory} from '../Controllers/ProductController.js';
import { upload } from '../Middleware/multer.js';


const router = express.Router();


router.post('/create', upload.single('image'), addProduct);
// Route to get all products
router.get('/products', getAllProducts);

// Route to get a product by ID
router.get('/:id', getProductById);

// Route to get products by category
router.get('/category/:categoryID', getProductsByCategory);

export default router;
