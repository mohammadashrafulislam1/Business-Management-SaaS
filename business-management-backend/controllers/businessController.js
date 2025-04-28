import { businessModel } from "../models/Business.js";
import { cloudinary } from "../utils/cloudinary.js";
// add business controller
export const addBusiness = async(req, res)=>{
    try{
    const {name, description, logo, owner} = req.body;
    if(!name, !logo){
        return res.status(404).json({message: "Required fields are missing."})
    }
  
      // Upload logo to Cloudinary
      const uploadResponse = await cloudinary.uploader.upload(logo, {
        folder: "business_logos", 
      });
  
      // Now save to MongoDB
      const business = new businessModel({
        name,
        description,
        logo: uploadResponse.secure_url, // use the uploaded image URL
        owner,
      });
  
  
    const savedBusiness = await business.save()
    res.json(savedBusiness)
    }
    catch (err){
        console.log(err)
        return res.status(500).json({ message: err.message })
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
    const updateBusiness = await businessModel.findByIdAndUpdate(id, {name, description, logo}, {new: true})
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
// business delete controller:
export const deleteBusiness = async(req, res)=>{
    const id = req.params.id;
   try{
    const deleteBusiness = await businessModel.findByIdAndDelete(id);
    if(!deleteBusiness){
        return res.status(404).json({message: "Business not found."})
     }
    res.json({message:"Business deleted successfully."})
   }
   catch (err){
    console.log(err)
    return res.status(500).json({ message: err.message })
  }
}