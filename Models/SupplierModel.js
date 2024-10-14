import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    supplierID: {
      type: String,
      required: true,
      unique: true,
    },
    supplier_first_name: {
      type: String,
      required: true,
    },
    supplier_last_name: {
        type: String,
        required: true,
      },
    contact: {
      type: String,
      required: true,
    },
    emailAddress: {
        type: String,
        required: true,
    },
    userName: {
      type: String,
      required: true,
  },
  password: {
    type: String,
    required: true,
},


    
  }, { timestamps: true });
  
  const supplierModel = mongoose.models.supplier || mongoose.model("supplier", supplierSchema);
  export default supplierModel;
  