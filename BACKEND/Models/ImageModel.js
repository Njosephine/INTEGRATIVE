import mongoose from 'mongoose';

// Define the Image Schema
const imageSchema = new mongoose.Schema({
  imageUrl: {
    type: String,    // Cloudinary image URL
    required: true,
  },
  public_id: {
    type: String,    // Public ID from Cloudinary
    required: true,
  },
  fileName: {
    type: String,    // Original name of the uploaded file
    required: true,
  },
  fileSize: {
    type: Number,    // File size in bytes
    required: true,
  },
  fileType: {
    type: String,    // MIME type of the file (e.g., image/jpeg, image/png)
    required: true,
  },
}, { timestamps: true });

// Create and export the Image model
const ImageModel = mongoose.model('Image', imageSchema);
export default ImageModel;
