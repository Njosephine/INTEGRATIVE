import ProductModel from "../Models/ProductModel.js";
import SalesModel from "../Models/SalesModel.js";

export const addSale = async (req, res) => {
    try {
        const {
            productID,
            quantitySold,
            unitPrice,
            saleDate,
            statusOfPayment,
            
        } = req.body;

        console.log("Incoming request body:", req.body); 
          // Check for all required fields
          if (!productID || !quantitySold|| ! unitPrice || !saleDate || !statusOfPayment) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }
        //check if product exists

        const product = await ProductModel.findOne({ productID });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        console.log("Product Found:", product);

         // Prepare sales data
         const salesData = {
            productID,
            quantitySold: Number( quantitySold),
            unitPrice: Number(unitPrice),
            saleDate,
            statusOfPayment
        };

        // Log the product data before saving
        console.log("Sale Data:", salesData);

        // Create and save the new product
        const newSale = new SalesModel(salesData);
        await newSale.save();

        res.status(201).json({ success: true, message: 'Sale Added Successfully', product: newSale });


}catch (error) {
        console.error('Error while adding sale:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
 
};


// / Fetch all sales
export const getAllSales = async (req, res) => {
    try {
        const sales = await SalesModel.find().populate('productID', 'productName');
        console.log("Fetched Sales:", sales); // Add this line to log fetched sales
        res.status(200).json({ success: true, sales });
    } catch (error) {
        console.error('Error while fetching sales:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

