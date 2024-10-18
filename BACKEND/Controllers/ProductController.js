import productModel from "../Models/ProductModel.js"; 
import SupplierModel from "../Models/SupplierModel.js";
import UserModel from "../Models/UserModel.js";
import CategoryModel from "../Models/CategoryModel.js";
import { v2 as cloudinary } from "cloudinary";

// API for adding Products
const addProduct = async (req, res) => {
    try {
        const { productID, productName, description, supplierID, userID, quantityAvailable, purchasePrice, sellingPrice } = req.body;
        const imageFile = req.file; 

        // Check for all required fields
        if (!productID || !productName || !description || !supplierID || !userID || !quantityAvailable || !purchasePrice || !sellingPrice || !imageFile) {
            return res.status(400).json({ success: false, message: "Missing Details" });
        }
       
        //Validate that category ,supplier and user exist
        const Category = await CategoryModel.findById(categoryID);
        if (!Category) return res.status(400).json({ success: false, message: "Invalid categoryID" });

        
        const Supplier = await SupplierModel.findById(supplierID);
        if (!Supplier) return res.status(400).json({ success: false, message: "Invalid supplierID" });

        const User = await UserModel.findById(userID);
        if (!User) return res.status(400).json({ success: false, message: "Invalid userID" });

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        // Prepare product data
        const productData = {
            productID,
            productName,
            description,
            supplierID,
            userID,
            quantityAvailable,
            purchasePrice,
            sellingPrice,
            image: imageUrl, 
            date: Date.now()
        };

        // Create and save the new product
        const newProduct = new productModel(productData);
        await newProduct.save();

        res.status(201).json({ success: true, message: 'Product Added Successfully', product: newProduct });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export default addProduct;
