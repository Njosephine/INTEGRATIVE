import ProductModel from "../Models/ProductModel.js"; 
import SupplierModel from "../Models/SupplierModel.js";
import CategoryModel from "../Models/CategoryModel.js";


// Add a new product with Cloudinary image upload
export const addProduct = async (req, res) => {
    try {
        const {
            productID,
            productName,
            description,
            supplierID,
            quantityAvailable,
            purchasePrice,
            sellingPrice,
            categoryID
        } = req.body;

        console.log("Incoming request body:", req.body); 
        console.log("Incoming file:", req.file); 
      
        // Check for all required fields
        if (!productID || !productName || !description || !supplierID || !quantityAvailable || !purchasePrice || !sellingPrice || !categoryID) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

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
            supplierID: supplier._id, // Use the ObjectId of the found supplier
            quantityAvailable: Number(quantityAvailable), // Ensure this is a number
            purchasePrice: Number(purchasePrice), // Ensure this is a number
            sellingPrice: Number(sellingPrice), // Ensure this is a number
            categoryID: category._id, // Use the ObjectId of the found category
        };

        // Check if file is uploaded and retrieve the image URL
        const image = req.file ? req.file.path : null; 
        if (image) {
            productData.image = image; // Add the image URL to product data if available
        } else {
            return res.status(400).json({ success: false, message: "Image file is required" });
        }

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
export const getAllProducts = async (req, res) => {
    try {
        const products = await ProductModel.find()
            .populate('supplierID', 'supplierName') // Adjust as per your supplier schema
            .populate('categoryID', 'categoryName'); // Adjust as per your category schema

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error while fetching products:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// Fetch a single product by ID
export const getProductById = async (req, res) => {
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
export const getProductsByCategory = async (req, res) => {
    const { categoryID } = req.params;

    try {
        const products = await ProductModel.find({ categoryID })
            .populate('supplierID', 'supplierName') // Adjust as per your supplier schema
            .populate('categoryID', 'categoryName'); // Adjust as per your category schema

        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error while fetching products by category:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

export default {
    addProduct,
    getAllProducts,
    getProductById,
    getProductsByCategory,
};