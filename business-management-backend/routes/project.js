import express from "express";
import { addProject, addTaskToProject, assignTask, deleteProject, deleteTaskToProject, getPorjectsWithBusinessId,getSpecificProject, startTaskTimer, stopTaskTimer, updateProject, updateTaskToProject } from "../controllers/projectController.js";
import { checkUserRole } from "../middleware/role.js";

export const projectRouter = express.Router();

// ---------- Projects -----
// post Project
projectRouter.post('/', addProject)

// get projects with businessId:
projectRouter.get('/business/:businessId', getPorjectsWithBusinessId)

// get specific project with id:
projectRouter.get('/:id', checkUserRole(['manager', 'owner',]), getSpecificProject)

// update project route:
projectRouter.put('/:id', checkUserRole(['manager', 'owner',]), updateProject)

// delete project route:
projectRouter.delete('/:id', checkUserRole(['manager', 'owner',]), deleteProject)

// ----------- Tasks ------

// Routes for tasks within a project
projectRouter.post('/:projectId/tasks', checkUserRole(['manager', 'owner']), addTaskToProject); // Add a task to a project
projectRouter.put('/:projectId/tasks/:taskId', checkUserRole(['manager', 'owner']), updateTaskToProject); // Update a task within a project
projectRouter.delete('/:projectId/tasks/:taskId', checkUserRole(['manager', 'owner']), deleteTaskToProject); // Delete a task from a project

// Assign Task (Manager)
projectRouter.put('/:projectId/tasks/:taskId/assign', checkUserRole(['manager', 'owner']), assignTask);

// Start Task timer:
projectRouter.put('/:projectId/tasks/:taskId/start', checkUserRole(['manager', 'owner', 'employee']), startTaskTimer);

// stop Task timer:
projectRouter.put('/:projectId/tasks/:taskId/stop', checkUserRole(['manager', 'owner', 'employee']), stopTaskTimer)