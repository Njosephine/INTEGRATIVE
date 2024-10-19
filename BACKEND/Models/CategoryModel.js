import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
  categoryID: {
    type: String,
    required: true,
    unique: true,
  },
  categoryName: {
    type: String,
    required: true,
  },
  
}, { timestamps: true });

const CategoryModel = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default CategoryModel;
