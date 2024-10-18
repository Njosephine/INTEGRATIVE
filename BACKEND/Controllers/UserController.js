import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';

// Retrieve all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { userID, first_name, last_name, contact, emailAddress, password, userName, role } = req.body;

  // Validate input
  if (!userID || !first_name || !last_name || !contact || !emailAddress || !password || !userName || !role) {
    return res.status(400).json({ message: "All fields are required: userID, first_name, last_name, contact, emailAddress, password, userName, and role." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new UserModel({ userID, first_name, last_name, contact, emailAddress, password: hashedPassword, userName, role });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
