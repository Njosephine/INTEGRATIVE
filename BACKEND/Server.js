import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./Config/Mongodb.js"
import {connectCloudinary} from "./Config/cloudinary.js"
import ProductRouter from './Routes/ProductRouter.js';
import CategoryRouter from './Routes/CategoryRouter.js';
import UserRouter from './Routes/UserRouter.js';
import SupplierRouter from './Routes/SupplierRouter.js';
import multer from 'multer';


//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.get("/",(req, res)=>{
res.send("API WORKING good")
})

// Use product routes for '/api/products' endpoint
app.use('/api/products', ProductRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/user', UserRouter);
app.use('/api/supplier', SupplierRouter);


app.listen(port, ()=> console.log("Server Started", port))