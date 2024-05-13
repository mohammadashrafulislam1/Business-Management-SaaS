import { businessModel } from "../models/Business.js";
// add business controller
export const addBusiness = async(req, res)=>{
    try{
    const {name, description, logo, owner} = req.body;
    if(!name, !logo){
        return res.status(404).json({message: "Required fields are missing."})
    }
    const business =new businessModel({name, description, logo, owner});
    const savedBusiness = await business.save()
    res.json(savedBusiness)
    }
    catch (e){
        console.log(e)
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// get businesses controller:
export const getBusiness = async(req, res)=>{
    try{
     const business = await businessModel.find().populate('owner', 'name email avatar')
     res.json(business)
    }
    catch (e){
        console.log(e)
        return res.status(500).json({ message: err.message })
    }
}
