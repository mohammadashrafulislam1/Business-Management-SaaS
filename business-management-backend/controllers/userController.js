import { populate } from "dotenv";
import { userModel } from "../models/User.js";

export const addUser = async(req, res)=>{
    try{
     const {name, email, password, avatar, role, businessProfile} = req.body;
     if(!name || !email || !password || !role){
        return res.status(404).json({error: "Required Fields are missing"})
     }
     const user =new userModel({name, email, password, avatar, role, businessProfile});
     const savedUser = await user.save();
     res.json(savedUser)
    }
    catch (e){
        console.log(e)
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// get all users (employee/employer) associated with business:
export const getUsersWithBusiness = async(req, res)=>{
    const businessId = req.params.businessId;
    try{
     const users = await userModel.find({businessProfile: businessId});
     res.json(users)
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error."});
      }    

}
// get user with unique Id:
export const getUser = async(req, res)=>{
    const id = req.params.id;
    try{
       const user = await userModel.findById(id)
       populate('businessProfile', name)

       if(!user){
        return res.status(404).json({message: "User not found."})
       }
       res.json(user)
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error."});
    }  
}