import express from "express";
import { addUser } from "../controllers/userController.js";

export const userRouter = express.Router();

// Post API for user
userRouter.post('/', addUser)