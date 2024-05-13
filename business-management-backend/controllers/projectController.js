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
    const businessId = req.body.businessId;
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