import OrderModel from '../Models/OrderModel.js';
import ProductModel from '../Models/ProductModel.js';
import SupplierModel from '../Models/SupplierModel.js';


// retrieve all orders
export const getAllOrders = async (req, res) => {
    try {
      const orders = await OrderModel.find()
     
  
      console.log('Retrieved orders:', orders); 
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };
  

// Add Order Function
export const addOrder = async (req, res) => {
  try {
    const { quantityOrdered, orderDate, productID, supplierID } = req.body;

    // Check if product exists and get categoryID as a string
    const product = await ProductModel.findOne({ productID });
    const supplier = await SupplierModel.findOne({ supplierID });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    // Create the order
    const newOrder = new OrderModel({
      quantityOrdered,
      orderDate,
      productID, 
      supplierID, 
      categoryID: product.categoryID, // Directly assign the categoryID as a string
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error while adding order:', error);
    res.status(500).json({ message: 'Error while adding order', error });
  }
};

export const getTotalOrders = async (req, res) => {
  try {
      const totalOrders = await OrderModel.countDocuments(); 
      res.json({ success: true, total: totalOrders });
  } catch (error) {
      console.error('Error fetching total orders:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
  }
};