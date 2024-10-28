import ProductModel from "../Models/ProductModel.js"; 
import SupplierModel from "../Models/SupplierModel.js";
import CategoryModel from "../Models/CategoryModel.js";
import { v2 as cloudinary } from "cloudinary";


// Add a new product with Cloudinary image upload
const addProduct = async (req, res) => {

    console.log("Incoming request body:", req.body); 
    console.log("Incoming file:", req.file); 
  
    try {
        const { productID, productName, description , supplierID, quantityAvailable, purchasePrice, sellingPrice,categoryID } = req.body;
         const imageFile = req.file

    
        // Check for all required fields
        if (!productID || !productName || !description || !supplierID || !quantityAvailable || !purchasePrice || !sellingPrice || !categoryID) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

         // upload image to cloudinary
         const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
         const imageUrl = imageUpload.secure_url

        // Check if the supplier and category exist
        const supplier = await SupplierModel.findOne({ supplierID });
        if (!supplier) return res.status(404).json({ success: false, message: "Supplier not found" });
        console.log("Supplier Found:", supplier);

        const category = await CategoryModel.findOne({ categoryID });
        if (!category) return res.status(404).json({ success: false, message: "Category not found" });
        console.log("Category Found:", category);

        // Prepare product data
        const productData = {
            productID,
            productName,
            description,
            supplierID,
            quantityAvailable: Number(quantityAvailable), 
            purchasePrice: Number(purchasePrice), 
            sellingPrice: Number(sellingPrice), 
            categoryID,
            image: imageUrl
        };

    
        // Log the product data before saving
        console.log("Product Data:", productData);

        // Create and save the new product
        const newProduct = new ProductModel(productData);
        await newProduct.save();

        res.status(201).json({ success: true, message: 'Product Added Successfully', product: newProduct });

    } catch (error) {
        console.error('Error while adding product:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};


// Fetch all products
 const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find({  cancelled: false });
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error while fetching products:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// Fetch a single product by ID
 const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await ProductModel.findById(id)
            .populate('supplierID', 'supplierName') // Adjust as per your supplier schema
            .populate('categoryID', 'categoryName'); // Adjust as per your category schema

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, product });
    } catch (error) {
        console.error('Error while fetching product:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// Additional function to filter products by category or other criteria
 const getProductsByCategory = async (req, res) => {
    const { categoryID } = req.params;

    try {
        const products = await ProductModel.find({ categoryID , cancelled: false })
            .populate('supplierID', 'supplierName') // Adjust as per your supplier schema
            .populate('categoryID', 'categoryName'); // Adjust as per your category schema

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error while fetching products by category:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

const productDelete  =async (req, res) => {
    try {
        const { productID} = req.params
        await ProductModel.findOneAndDelete( {productID}, { cancelled: true},   { new: true })
        res.json({success: true, message: 'Product deleted,  successfully'})
    }catch (error){
        console.log(error)
        res.json({success: false, message: error.message}) 
    }
}

const updateProduct = async (req, res) => {
    try {
        const { productID } = req.params;
        const updateData = req.body;
  // Update the product with the new data
        const updatedProduct = await ProductModel.findOneAndUpdate(
            { productID },
            updateData,
            { new: true, runValidators: true } // Options: return the updated document and run validators
        );

        res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
        console.error('Error while updating product:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};


const getTotalProducts = async (req, res) => {
    try {
        const totalProducts = await ProductModel.countDocuments(); // Use ProductModel instead of Product
        res.json({ success: true, total: totalProducts });
    } catch (error) {
        console.error('Error fetching total products:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export {
    addProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    productDelete,
    updateProduct,
    getTotalProducts 
   
  
}