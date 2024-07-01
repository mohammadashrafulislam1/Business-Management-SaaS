import { populate } from "dotenv";
import { userModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const addUser = async(req, res)=>{
    try{
     const {name, email, password, avatar, role, businessProfile} = req.body;
     if(!name || !email || !password || !role){
        return res.status(404).json({error: "Required Fields are missing"})
     }
     console.log(password)
     const hashedPassword = await bcrypt.hash(password, 10);
     const user =new userModel({name, email, password:hashedPassword, avatar, role, businessProfile});
     const savedUser = await user.save();
     //  JWT
     const token = jwt.sign(
       { email: savedUser.email, id: savedUser._id },
       process.env.JWT_TOKEN,
       { expiresIn: "4d" }
     );
     console.log({hashedPassword, savedUser, token})
     res.json({savedUser, token})
    }
    catch (e){
        console.log(e)
        return res.status(500).json({error: "Internal Server Error."})
    }
}

// Login User Function
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and Password are required" });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid Password" });
        }
        // JWT
        const token = jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_TOKEN,
            { expiresIn: "4d" }
        );
        res.json({ user, token });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal Server Error." });
    }
};


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
    const id = req.params._id;
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
// update user profile controller:
export const updateUser = async(req, res)=>{
    const id = req.params._id;
    const {name, email, password, businessProfile, role, avatar}= req.body;
    try{
    const existingUser = await userModel.findById(id);
    if(!existingUser){
        return res.status(404).json({message:"User not found."})
    }
    existingUser.name = name ||existingUser.name,
    existingUser.email = email ||existingUser.email,
    existingUser.password = password ||existingUser.password,
    existingUser.businessProfile = businessProfile ||existingUser.businessProfile,
    existingUser.role = role ||existingUser.role,
    existingUser.avatar = avatar ||existingUser.avatar

    const updatedUser = await existingUser.save();
    res.json(updatedUser)
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error."});
    } 
}

// delete user Controller

export const deleteUser = async(req, res)=>{
    const id = req.params._id;

    try{
        const deletedUser = await userModel.findByIdAndDelete(id)
        if(!deletedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.json({message: "Successfully deleted."})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal Server Error."});
    } 
}