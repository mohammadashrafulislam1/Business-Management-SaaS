import express from "express";
import { addBusiness } from "../controllers/businessController";

export const businessRouter = express.Router();

// POST API for business:
businessRouter.post('/', addBusiness)