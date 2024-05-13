import express from "express";
import { addProject, getPorjectsWithBusinessId } from "../controllers/projectController.js";

export const projectRouter = express.Router();


// post Project
projectRouter.post('/', addProject)

// get projects with businessId:
projectRouter.get('/:businessId', getPorjectsWithBusinessId)