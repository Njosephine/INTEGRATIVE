import express from 'express';
import  upload  from '../Middleware/multer.js';  
import { uploadImageController } from '../Controllers/ImageController.js';  

const router = express.Router();

// Route to handle image upload
router.post('/upload', upload.single('profile-image'), uploadImageController);

export default router;
