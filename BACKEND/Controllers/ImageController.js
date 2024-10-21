import { v2 as cloudinary } from 'cloudinary';
import ImageModel from '../Models/ImageModel.js';  // Import your Image model

// Image upload controller
export const uploadImageController = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'uploads',  // Optional: specify a folder in Cloudinary
    });

    // Create a new image entry in the database
    const newImage = new ImageModel({
      imageUrl: result.secure_url,    // Cloudinary URL
      public_id: result.public_id,    // Public ID from Cloudinary
      fileName: req.file.originalname,  // Original file name
      fileSize: req.file.size,          // File size
      fileType: req.file.mimetype,      // MIME type of the file
    });

    // Save image details to the database
    await newImage.save();

    // Return the saved image metadata
    res.status(201).json({
      message: "Image uploaded and saved successfully",
      image: newImage,  // Return the saved image metadata
    });
  } catch (error) {
    console.error("Error uploading image: ", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
