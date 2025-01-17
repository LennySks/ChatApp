import express from "express";
import {login, logout, signup, updateProfile} from "../controllers/auth.controller";
import {protectedRoute} from "../middleware/auth.middleware";

export const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.put("/update-profile", protectedRoute, updateProfile)