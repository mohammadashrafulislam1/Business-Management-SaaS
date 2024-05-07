import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    description: {
        type:String
    },
    logo:{
        type:String,
        require:true
    },
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
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

export const businessModel = mongoose.model('business', businessSchema);