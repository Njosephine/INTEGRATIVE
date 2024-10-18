import SupplierModel from '../Models/SupplierModel.js';
import bcrypt from 'bcrypt';

// Retrieve all users
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await SupplierModel.find();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
export const addSupplier = async (req, res) => {
  const {supplierID, supplier_first_name, supplier_last_name, contact, emailAddress, password, userName } = req.body;

  // Validate input
  if (!supplierID || !supplier_first_name|| !supplier_last_name|| !contact || !emailAddress || !password || !userName ) {
    return res.status(400).json({ message: "All fields are required: supplierID, supplier_first_name, supplier_last_name, contact, emailAddress, password and userName" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newSupplier = new SupplierModel({ supplierID, supplier_first_name, supplier_last_name, contact, emailAddress, password, userName });

  try {
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
