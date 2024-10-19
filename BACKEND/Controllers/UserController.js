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




// Add a new user with Cloudinary image upload
export const addUser = async (req, res) => {
  console.log("Incoming request body:", req.body); 
  console.log("Incoming file:", req.file); // Logs the uploaded file info

  const { first_name, last_name, emailAddress, password, userName, role, status } = req.body;

  // Validate input
  if (!first_name || !last_name || !emailAddress || !password || !userName || !role || !status) {
    return res.status(400).json({ message: "All fields are required: first_name, last_name, emailAddress, password, userName, role, and status." });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailAddress)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if file is uploaded and retrieve the Cloudinary image URL
  const image = req.file ? req.file.path : null; 

  // Create a new user instance with the gathered data
  const newUser = new UserModel({ 
    first_name, 
    last_name, 
    emailAddress, 
    password: hashedPassword, 
    userName, 
    role, 
    status, 
    image,
  });

  try {
    // Save the new user to the database
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error saving new user:", error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};



// Update a user
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { first_name, last_name, emailAddress } = req.body;

  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { first_name, last_name, emailAddress },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await UserModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: error.message });
  }
};



export const getTotalUsers = async (req, res) => {
  try {
    const totalUsers = await UserModel.countDocuments(); 
    res.status(200).json({ total: totalUsers });
  } catch (error) {
    console.error("Error fetching total users:", error);
    res.status(500).json({ message: error.message });
  }
};
