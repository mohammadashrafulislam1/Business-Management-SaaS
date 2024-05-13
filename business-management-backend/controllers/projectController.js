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