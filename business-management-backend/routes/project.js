import express from "express";
import { addProject, deleteProject, getPorjectsWithBusinessId,getSpecificProject, updateProject } from "../controllers/projectController.js";

export const projectRouter = express.Router();

// post Project
projectRouter.post('/', addProject)

// get projects with businessId:
projectRouter.get('/business/:businessId', getPorjectsWithBusinessId)

// get specific project with id:
projectRouter.get('/:id', getSpecificProject)

// update project route:
projectRouter.put('/:id', updateProject)

// delete project route:
projectRouter.delete('/:id', deleteProject)