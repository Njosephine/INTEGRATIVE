import express from 'express';
import { getAllUsers, addUser , updateUser, deleteUser,getTotalUsers } from '../Controllers/UserController.js';
import { upload } from '../Middleware/multer.js';


const router = express.Router();

// Route to retrieve all categories
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// GET total number of users
router.get('/total', getTotalUsers);


router.post('/users', upload.single('image'), addUser);

export default router;
