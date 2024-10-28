import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  quantityOrdered: {
    type: Number,
    required: true,
  },
  orderDate: {
    type: Date,
    required: true,
  },
  productID: {
    type: String,
    ref: 'Product',
    required: true,
  },
  supplierID: {
    type: String,
    ref: 'Supplier',
    required: true,
  },
  categoryID: {
    type: String,
    ref: 'Category',
    required: true,
  },
  categoryName: {
    type: String,
    required: false, 
    default: ''
  }
}, { timestamps: true });

const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default OrderModel;
