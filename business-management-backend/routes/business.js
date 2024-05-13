import express from "express";
import { addBusiness, getBusiness, singleBusiness } from "../controllers/businessController.js";

export const businessRouter = express.Router();

// POST API for business:
businessRouter.post('/', addBusiness)

// GET API for businesses:
businessRouter.get('/', getBusiness)

// GET API for single business:
businessRouter.get('/:id', singleBusiness)