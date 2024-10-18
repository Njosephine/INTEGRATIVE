import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
  productID: {
    type: String,
    required: true,
    unique: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  categoryID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  supplierID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
  purchasePrice: {
    type: Number,
    required: true,
  },
  sellingPrice: {
    type: Number,
    required: true,
  },
  image: {
    type: String, 
    required: true,
  },
}, { timestamps: true });

const ProductModel = mongoose.models.product || mongoose.model("product", productSchema);
export default ProductModel;
