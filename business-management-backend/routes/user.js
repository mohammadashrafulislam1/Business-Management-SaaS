import express from "express";
import { addUser, getUser, getUsersWithBusiness, updateUser } from "../controllers/userController.js";

export const userRouter = express.Router();
const router = express.Router();
// Post API for user
userRouter.post('/', addUser)
// get user with unique Id:
userRouter.get('/:id', getUser)
// update user with id route
userRouter.put('/:id', updateUser)



// GET API for users (employee/employer) associated with business.
router.get('/business/:businessId', getUsersWithBusiness)