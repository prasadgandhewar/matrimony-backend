import express from 'express';
import registerUser, { getUserProfile, loginUser, logoutUser, resetPassword } from '../controllers/auth-controller.js';
import { authenticateUser, validateRequest } from '../middlewares/middleware.js';
import { registerSchema, loginSchema } from '../validations/auth-validations.js';

const router = express.Router();

router.post('/login', (req, res, next) => validateRequest(req, res, next, loginSchema), loginUser);
router.post('/register', (req, res, next) => validateRequest(req, res, next, registerSchema), registerUser);
router.post('/logout', authenticateUser, logoutUser);
router.post('/reset-password', resetPassword);
router.get('/profile', authenticateUser, getUserProfile);
export default router;