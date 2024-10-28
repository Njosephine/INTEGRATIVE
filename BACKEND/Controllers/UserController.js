import UserModel from '../Models/UserModel.js';
import bcrypt from 'bcrypt';
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";

// Retrieve all users
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}).select('-password');
    res.json({success: true, users})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// API to add user
const addUser = async (req, res) => {
  console.log("Incoming request body:", req.body); 
  console.log("Incoming file:", req.file); 
try{
  const { first_name, last_name, emailAddress, password, userName, role, status } = req.body;
  const imageFile = req.file

  // Validate input
  if (!first_name || !last_name || !emailAddress || !password || !userName || !role || !status) {
    return res.status(400).json({ message: "All fields are required: first_name, last_name, emailAddress, password, userName, role, and status." });
  }

  // Validate email format
if(!validator. isEmail(emailAddress)) {
  return res.json({sucess: false, message: "Please enter a valid email"})
}

  // Validate password length
  if (password.length < 6) {
    return res.status(400).json({ message: "Password must be at least 6 characters long." });
  }

  // Hash the password
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds);

   // upload image to cloudinary
  const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
  const imageUrl = imageUpload.secure_url

  // Create a new user instance with the gathered data
  const UserData ={ 
    first_name, 
    last_name, 
    emailAddress, 
    password: hashedPassword, 
    userName, 
    role, 
    status, 
    image: imageUrl
  };

 
    const newUser = new UserModel(UserData)
    await newUser.save();
    res.json({ success: true, message: 'User Added'})
    
  } catch (error) {
    console.log(error);
      res.json({ success: false, message: error.message });
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

export{
  addUser,
  getAllUsers
}


