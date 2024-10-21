import mongoose from "mongoose";

const SalesSchema = new mongoose.Schema({
  productID: {
    type: String, 
    required: true,
  },
  quantitySold: {
    type: Number, 
    required: true,
  },
  unitPrice: {
    type: Number, 
    required: true,
  },
  saleDate: {
    type: Date,
    required: true,
  },
  statusOfPayment: {
    type: String, 
    required: true,
  }
}, { timestamps: true }); 

const SalesModel = mongoose.models.Sales || mongoose.model("Sales", SalesSchema);
export default SalesModel;
