import mongoose from "mongoose";
import { projectModel } from "../models/Project.js";

// add project controller:
export const addProject = async(req, res)=>{
    const {name, description, budget, deadline, businessProfile} = req.body;
    try{
       if(!name || !description ||!deadline){
        return res.status(404).json({message: "Required fields are missing."})
       }
      const project = new projectModel({name, description, budget, deadline, businessProfile})
      const savedProject = await project.save();
      res.json(savedProject)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// get projects under business:
export const getPorjectsWithBusinessId = async(req, res)=>{
    const businessId = req.params.businessId;
    console.log(businessId)
    try{
    const projects = await projectModel.find({businessProfile: businessId})
    res.json(projects)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// get specific project:
export const getSpecificProject = async(req, res)=>{
    const id = req.params.id;
    try{
      const project = await projectModel.findById(id).populate('businessProfile', 'name')
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
  
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// update project controller
export const updateProject = async(req, res)=>{
    const id = req.params.id;
    const {name, description, budget, deadline} = req.body;
    try{
    const updatedProject = await projectModel.findByIdAndUpdate(id, {name, description, budget, deadline}, {new: true})
    if (!updatedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
    res.json(updatedProject)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// Delete project controller:
export const deleteProject = async(req, res)=>{
    const id = req.params.id;
    try{
     const deletedProject = await projectModel.findByIdAndDelete(id);
     if (!deletedProject) {
        return res.status(404).json({ message: 'Project not found' });
      }
     res.json({message: "Project deleted successfully."})
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}
// Add task to project:
export const addTaskToProject = async(req, res)=>{
    const {projectId} = req.params;
    const {title, description} =req.body;
    if(!title || !description){
        return res.status(404).json({message: "Required fields are missing."})
       }
    try{
    console.log(req.body)
     const project = await projectModel.findById(projectId);
     if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
    // Create new task
    const newTask = {
        title,
        description,
        startTime: null,
        endTime: null,
    };
    project.tasks.push(newTask)
    await project.save()
    res.json(project)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// update task - project:
export const updateTaskToProject = async(req, res)=>{
    const {projectId, taskId} = req.params;
    const {title, description} =req.body;
    if(!title || !description){
        return res.status(404).json({message: "Required fields are missing."})
       }
    try{
        const project = await projectModel.findById(projectId);
        if (!project) {
           return res.status(404).json({ message: 'Project not found' });
         }
         // Find task by ID
         const task = project.tasks.find(task => task_id === taskId)
         if (!task) {
             return res.status(404).json({ message: 'Task not found' });
         }
       task.title=title,
       task.description=description
       
       await project.save()
       res.json(project)
    }
    catch (err){
           console.log(err)
           return res.status(500).json({ message: err.message })
       }
}

// delete task - project
export const deleteTaskToProject = async(req, res)=>{
    const {projectId, taskId} = req.params;
    try{
        const project = await projectModel.findById(projectId);
        if (!project) {
           return res.status(404).json({ message: 'Project not found' });
         }
       // Find the index of the task with the given taskId
       const taskIndex = project.tasks.findIndex(task => task._id == taskId);

       if (taskIndex === -1) {
           return res.status(404).json({ message: 'Task not found' });
       }

       // Remove the task from the tasks array
       project.tasks.splice(taskIndex, 1);
       await project.save()
       res.json(project)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// Assign Task (Manager)
export const assignTask = async (req, res) => {
    const { projectId, taskId } = req.params;
    const { assigneeId } = req.body; // Assuming assigneeId is sent in the request body
    try {
      const project = await projectModel.findById(projectId);
      // Find task by ID
      const task = project.tasks.id(taskId);
      console.log(task)
      if (!task) {
          return res.status(404).json({ message: 'Task not found' });
      }
  
      // Check if assigneeId is provided and is valid
      if (!assigneeId) {
        return res.status(400).json({ message: 'Assignee ID is required' });
      }
      // Convert assigneeId to ObjectId
      const assigneeObjectId = new mongoose.Types.ObjectId(assigneeId);

      // Set the assignee for the task
      task.assignee = assigneeObjectId;
      await project.save();
  
      res.json({ message: 'Task assigned successfully', task });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }
  };
  

// Start Task timer:
export const startTaskTimer = async(req, res)=>{
    const {projectId, taskId} = req.params;
    try{
     const project = await projectModel.findById(projectId);
     // Find task by ID
     const task = project.tasks.id(taskId);
      console.log(task)
     if (!task) {
         return res.status(404).json({ message: 'Task not found' });
     }
     console.log(task.startTime)
     if (task.startTime) {
        return res.status(400).json({ message: 'Task timer already started' });
        }
    task.startTime = new Date();
    await project.save();
    res.json({ message: 'Task timer started successfully', project})
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// Stop Task timer:
export const stopTaskTimer = async(req, res)=>{
    const {projectId, taskId} = req.params;
    try{
     const project = await projectModel.findById(projectId);
     // Find task by ID
     const task = project.tasks.id(taskId);
      console.log(task)
     if (!task) {
         return res.status(404).json({ message: 'Task not found' });
     }
     if (!task.startTime) {
        return res.status(400).json({ message: 'Task timer is not started' });
        }
    task.endTime= new Date()
    const duration = Math.floor((task.endTime - task.startTime) / (1000 * 60)); // Calculate duration in minutes
    task.duration=duration;
    // Update total hours for the project
    project.totalHours = (project.totalHours || 0) + (duration / 60); // Convert minutes to hours and add to totalHours
    console.log(project)
    await project.save();
    res.json({ message: 'Task timer stopped successfully', duration });
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

