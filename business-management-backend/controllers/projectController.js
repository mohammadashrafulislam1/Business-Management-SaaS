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

// Start Task timer:
export const startTaskTimer = async(req, res)=>{
    const {projectId, taskId} = req.params;
    try{
     const project = await projectModel.findById(projectId);
     const task = project.tasks._id(taskId)
     if(!task){
        return res.status(404).json({message: "Task not round"})
     }
     if (task.startTime) {
        return res.status(400).json({ message: 'Task timer already started' });
        }
    res.json({ message: 'Task timer started successfully' })
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// Stop Task timer:
export const stopTaskTimer = async(req, res)=>{
    
}