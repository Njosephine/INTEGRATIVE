import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
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
  status:{
    type: String, 
    required: true,
  },
  image: {
    type: String, 
    required: false, 
  },
}, { timestamps: true });

const UserModel = mongoose.models.user || mongoose.model("User", userSchema);
export default UserModel;
