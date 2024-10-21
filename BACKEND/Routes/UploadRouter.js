import express from 'express';
import { upload } from '../Middleware/multer.js';  // Multer for file handling
import { uploadImageController } from '../Controllers/ImageController.js';  // Controller

const router = express.Router();

// Route to handle image upload
router.post('/upload', upload.single('profile-image'), uploadImageController);

export default router;
