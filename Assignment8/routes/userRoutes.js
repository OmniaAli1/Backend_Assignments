import express from 'express';
import { signup, login, updateUser, deleteUser, getUser } from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Public routes (no token required)
router.post('/signup', signup);
router.post('/login', login);

// Protected routes (token required)
router.patch('/', authenticate, updateUser);
router.delete('/', authenticate, deleteUser);
router.get('/', authenticate, getUser);

export default router;
