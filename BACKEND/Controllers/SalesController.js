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
        if (!productID || !quantitySold || !unitPrice || !saleDate || !statusOfPayment) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Check if product exists
        const product = await ProductModel.findOne({ productID });
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });
        console.log("Product Found:", product);

        // Validate quantitySold and unitPrice
        if (isNaN(quantitySold) || isNaN(unitPrice)) {
            return res.status(400).json({ success: false, message: "Quantity sold and unit price must be numbers" });
        }

        // Prepare sales data
        const salesData = {
            productID,
            quantitySold: Number(quantitySold),
            unitPrice: Number(unitPrice),
            saleDate: new Date(saleDate), // Ensure this is a valid date
            statusOfPayment
        };

        // Log the product data before saving
        console.log("Sale Data:", salesData);

        // Create and save the new sale
        const newSale = new SalesModel(salesData);
        await newSale.save();

        res.status(201).json({ success: true, message: 'Sale Added Successfully', product: newSale });

    } catch (error) {
        console.error('Error while adding sale:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// Fetch all sales
export const getAllSales = async (req, res) => {
    try {
        const sales = await SalesModel.find().populate('productID', 'productName');
        console.log("Fetched Sales:", sales);
        res.status(200).json({ success: true, sales });
    } catch (error) {
        console.error('Error while fetching sales:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// Delete sale
export const deleteSale = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedSale = await SalesModel.findByIdAndDelete(id);
        if (!deletedSale) {
            return res.status(404).json({ success: false, message: 'Sale not found' });
        }
        res.json({ success: true, message: 'Sale deleted successfully' });
    } catch (error) {
        console.error('Error while deleting sale:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};

// Update sale
export const updateSale = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Ensure saleDate is converted to a Date object if it's provided
        if (updateData.saleDate) {
            updateData.saleDate = new Date(updateData.saleDate);
        }

        // Update the sale with the new data
        const updatedSale = await SalesModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedSale) {
            return res.status(404).json({ success: false, message: 'Sale not found' });
        }

        res.status (200).json({ success: true, message: 'Sale updated successfully', sale: updatedSale });
    } catch (error) {
        console.error('Error while updating sale:', error);
        res.status(500).json({ success: false, message: 'Server Error: ' + error.message });
    }
};


export const getTotalSales = async (req, res) => {
    try {
        const totalSales = await SalesModel.countDocuments(); 
        res.json({ success: true, total: totalSales });
    } catch (error) {
        console.error('Error fetching total products:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};