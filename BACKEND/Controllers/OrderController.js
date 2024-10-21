import OrderModel from '../Models/OrderModel.js';
import ProductModel from '../Models/ProductModel.js';
import SupplierModel from '../Models/SupplierModel.js';


// retrieve all orders
export const getAllOrders = async (req, res) => {
    try {
      const orders = await OrderModel.find()
        .populate('productID')
        .populate('supplierID')
        .populate('categoryID'); // Populate category if needed
  
      console.log('Retrieved orders:', orders); // Log the retrieved orders
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ message: 'Error retrieving orders', error });
    }
  };
  

export const addOrder = async (req, res) => {
  try {
    const { quantityOrdered, orderDate, productID, supplierID } = req.body;

    // Check if product exists and populate category
    const product = await ProductModel.findOne({ productID }).populate('categoryID');
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
      productID: product._id, 
      supplierID: supplier._id, 
      categoryID: product.categoryID, 
      categoryName: product.categoryID.categoryName, 
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error('Error while adding order:', error);
    res.status(500).json({ message: 'Error while adding order', error });
  }
};
