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
    type: String,
    ref: 'Category',
    required: true,
  },
  supplierID: {
    type: String,
    ref: 'Supplier',
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
  cancelled: { 
    type: Boolean,
    default: false, 
  }
}, { timestamps: true });

const ProductModel = mongoose.models.product || mongoose.model("Product", productSchema);
export default ProductModel;
