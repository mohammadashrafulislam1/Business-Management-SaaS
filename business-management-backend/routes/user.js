import express from "express";
import { addUser, deleteUser, getUser, getUsersWithBusiness, loginUser, updateUser } from "../controllers/userController.js";
import { jwtMiddleware } from "../middleware/jwt.js";

export const userRouter = express.Router();
const router = express.Router();
// Post API for user
userRouter.post('/add', addUser)

// Login API for user
userRouter.post('/login', loginUser)
// get user with unique Id:
userRouter.get('/:_id', getUser)
// update user with id route
userRouter.put('/:_id', updateUser)
// delete user with id route
userRouter.delete('/:_id', deleteUser)



// GET API for users (employee/employer) associated with business.
router.get('/business/:businessId', getUsersWithBusiness)
