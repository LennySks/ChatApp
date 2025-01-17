import express from "express";
import {
  checkAuth,
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller";
import { protectedRoute } from "../middleware/auth.middleware";
import { uploadMiddleware } from "../middleware/multer";

export const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/logout", logout);
authRoutes.put(
  "/update-profile",
  protectedRoute,
  uploadMiddleware,
  updateProfile
);

authRoutes.get("/check", protectedRoute, checkAuth);
