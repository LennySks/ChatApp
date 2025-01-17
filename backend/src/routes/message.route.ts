import express from "express";
import { protectedRoute } from "../middleware/auth.middleware";
import {
  getMessages,
  getUsersForSidebar,
} from "../controllers/message.controller";

export const messagesRoute = express.Router();

messagesRoute.get("/users", protectedRoute, getUsersForSidebar);
messagesRoute.get("/:id", protectedRoute, getMessages);
messagesRoute.post("/send/:id", protectedRoute, getMessages);
