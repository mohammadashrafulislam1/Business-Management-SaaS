import express from "express";
import { addProject, addTaskToProject, deleteProject, deleteTaskToProject, getPorjectsWithBusinessId,getSpecificProject, startTaskTimer, stopTaskTimer, updateProject, updateTaskToProject } from "../controllers/projectController.js";

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

// -----------

// Routes for tasks within a project
projectRouter.post('/:projectId/tasks', addTaskToProject); // Add a task to a project
projectRouter.put('/:projectId/tasks/:taskId', updateTaskToProject); // Update a task within a project
projectRouter.delete('/:projectId/tasks/:taskId', deleteTaskToProject); // Delete a task from a project

// Start Task timer:
projectRouter.put('/:projectId/tasks/:taskId/start', startTaskTimer);

// stop Task timer:
projectRouter.put('/:projectId/tasks/:taskId/stop', stopTaskTimer)