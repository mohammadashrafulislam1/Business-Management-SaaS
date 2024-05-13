import express from "express";
import { addBusiness, getBusiness } from "../controllers/businessController.js";

export const businessRouter = express.Router();

// POST API for business:
businessRouter.post('/', addBusiness)

// GET API for business:
businessRouter.get('/', getBusiness)