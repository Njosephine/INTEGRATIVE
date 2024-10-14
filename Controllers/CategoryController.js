import CategoryModel from '../Models/CategoryModel.js';

// Retrieve all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new category
export const addCategory = async (req, res) => {
  const { categoryID, categoryName } = req.body;

  // Validate input
  if (!categoryID || !categoryName) {
    return res.status(400).json({ message: "categoryID and categoryName are required." });
  }

  const newCategory = new CategoryModel({ categoryID, categoryName });

  try {
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
