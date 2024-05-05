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