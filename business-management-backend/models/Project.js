import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const TasksSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    startTime: Date,
    endTime: Date,
    duration:Number,
})

const ProjectSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    budget:{
        type: Number
    },
    deadline:{
        type: Number,
        require: true
    },
    businessProfile:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'business',
    },
    tasks:[TasksSchema],
    totalHours: {
        type: Number,
        default: 0,
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

export const projectModel = mongoose.model('projects', ProjectSchema)