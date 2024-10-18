// import multer from "multer";

// const storage = multer.diskStorage({
//     filename: function (req, file, callback) {
//         callback(null, file.originalname)
//     }
// });

// const upload = multer({ storage: storage })

// export default upload



import { cloudinary } from '../Config/cloudinary.js'; 

import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure multer to use Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'user_images',  // Folder in Cloudinary
    // allowed_formats: ['jpg', 'png'],  // Allowed image formats
    public_id: (req, file) => Date.now() + '-' + file.originalname, // Unique public ID for each file
  },
});

// Create multer instance with Cloudinary storage
const upload = multer({ storage });

export { upload };
