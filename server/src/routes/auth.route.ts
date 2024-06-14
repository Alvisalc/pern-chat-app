import express from 'express';
import { login, logout, signup, getMe } from '../controllers/auth.controller.js';
import protectRoute from '../middleware/protectRoute.js';

const router = express.Router();

// <url>/api/auth/routes
router.get("/me", protectRoute, getMe); // add protectRoute (middleware) to add 1 more layer to protect user data
router.post("/login", login);
router.post("/logout", logout)
router.post("/signup", signup);

export default router;