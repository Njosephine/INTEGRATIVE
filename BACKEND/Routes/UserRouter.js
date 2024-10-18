import express from 'express';
import { getAllUsers, addUser } from '../Controllers/UserController.js';

const router = express.Router();

// Route to retrieve all categories
router.get('/users', getAllUsers);

// Route to add a new category
router.post('/users', addUser);

export default router;
