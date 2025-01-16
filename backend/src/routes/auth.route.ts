import express from "express";
import {login, logout, signup} from "../controllers/auth.controller";

export const router = express.Router();

router.post("/signup", signup )
router.post("/login", login)
router.post("/logout", logout)