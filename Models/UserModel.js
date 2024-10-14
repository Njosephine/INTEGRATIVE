import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userID: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  
  contact: {
    type: Number,
    required: true,
  },
  emailAddress: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  role: {
    type: String, 
    required: true,
  },
}, { timestamps: true });

const UserModel = mongoose.models.user || mongoose.model("User", userSchema);
export default UserModel;
