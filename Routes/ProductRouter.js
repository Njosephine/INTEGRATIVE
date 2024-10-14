import express from 'express';
import addProduct from '../Controllers/ProductController.js';
import multer from 'multer'; 

const ProductRouter = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Route to create a new product
ProductRouter.post('/create', addProduct);

// Export the router to use it in the main application
export default ProductRouter;
