import express from 'express';
import { getAllUsers, addUser , updateUser, deleteUser,getTotalUsers } from '../Controllers/UserController.js';
import upload from '../Middleware/multer.js';


const UserRouter = express.Router();

// Route to retrieve all categories
UserRouter.get("/all-users", getAllUsers);
UserRouter.put('/users/:id', updateUser);
UserRouter.delete('/users/:id', deleteUser);


UserRouter.get('/total', getTotalUsers);


UserRouter.post("/add-user", upload.single('image'), addUser);

export default UserRouter;
