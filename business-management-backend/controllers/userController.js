import { populate } from "dotenv";
import { userModel } from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { cloudinary } from "../utils/cloudinary.js";

export const addUser = async (req, res) => {
    try {
      // Use Cloudinary to upload the image
      console.log(req.file.path);
      const imageResult = await cloudinary.uploader.upload(req.file.path);
  
      const { name, email, password, role, businessProfile } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(400).json({ error: "Required Fields are missing" });
      }
  
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
  
      const avatar = imageResult.secure_url;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({
        name,
        email,
        password: hashedPassword,
        avatar,
        role,
        businessProfile,
      });
      const savedUser = await user.save();
  
      // JWT
      const token = jwt.sign(
        { email: savedUser.email, id: savedUser._id },
        process.env.JWT_TOKEN,
        { expiresIn: "4d" }
      );
  
      console.log({ hashedPassword, savedUser, token });
      res.status(201).json({ savedUser, token });
    } catch (e) {
      console.log(e);
      if (e.code === 11000) {
        return res.status(400).json({ error: "Duplicate email error" });
      }
      return res.status(500).json({ error: "Internal Server Error." });
    }
  };

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

// Get Current User Function
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.decoded || !req.decoded.id) {
      return res.status(401).json({ message: "Unauthorized access. No user ID found in token." });
    }
    console.log("current:", req.decoded);
    const userId = req.decoded.id; // Ensure correct property name here

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const getManagers = async (req, res) => {
  try {
    const { businessProfiles } = req.query; // expecting comma-separated string or array

    const businessProfileArray = Array.isArray(businessProfiles)
      ? businessProfiles
      : businessProfiles?.split(",").map((bp) => bp.trim());

    const query = {
      role: { $regex: /^manager$/i },
    };

    if (businessProfileArray?.length) {
      query.businessProfile = { $in: businessProfileArray };
    }

    const managers = await userModel.find(query);
    res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch managers" });
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
    const {name, email, password, businessProfile, role, avatar, isActive}= req.body;
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
    existingUser.avatar = avatar ||existingUser.avatar,
    existingUser.isActive === isActive || false

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