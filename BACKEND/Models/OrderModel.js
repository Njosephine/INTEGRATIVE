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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  supplierID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true, // If you want to keep this
  },
  categoryName: {
    type: String,
    required: true, // If you want to keep this
  }
}, { timestamps: true });

const OrderModel = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default OrderModel;
