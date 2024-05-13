import express from "express";
import { addBusiness } from "../controllers/businessController.js";

export const businessRouter = express.Router();

// POST API for business:
businessRouter.post('/', addBusiness)