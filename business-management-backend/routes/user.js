import express from "express";
import { addUser, getUsersWithBusiness } from "../controllers/userController.js";

export const userRouter = express.Router();
const router = express.Router();
// Post API for user
userRouter.post('/', addUser)
// GET API for users (employee/employer) associated with business.
router.get('/business/:businessId', getUsersWithBusiness)