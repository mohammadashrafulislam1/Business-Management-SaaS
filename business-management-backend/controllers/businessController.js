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
     if(!business){
        return res.status(404).json({message: "Business not found."})
     }
     res.json(business)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// get single Business Controller:
export const singleBusiness = async(req, res)=>{
    const id = req.params.id;
    try{
     const business = await businessModel.findById(id).populate('owner', 'name email avatar')
     if(!business){
        return res.status(404).json({message: "Business not found."})
     }
     res.json(business)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}

// single business update controller:
export const updateBusiness = async(req, res)=>{
    const id = req.params.id;
    const {name, description, logo} = req.body;
    try{
    const updateBusiness = await businessModel.findByIdAndDelete(id, {name, description, logo}, {new: true})
    if(!updateBusiness){
        return res.status(404).json({message: "Business not found."})
     }
    res.json(updateBusiness)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
    }
}