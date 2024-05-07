import { businessModel } from "../models/Business";

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