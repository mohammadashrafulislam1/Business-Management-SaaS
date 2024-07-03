import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String, 
        required: true,
        unique: true
    },
    password:{
        type: String, 
        required: true,
    },
    avatar:{type: String},
    role:{
        type:String, 
        required: true,
        enum:['manager', 'owner', 'employee']
    },
    businessProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'business',
    },
    isActive:{
        type: Boolean,
        defaultValue:false
    },
    created_at:{
        type:Date,
        default:Date.now
    },
    updated_at:{
        type:Date,
        default:Date.now
    }
})

export const userModel = mongoose.model('users', UserSchema)