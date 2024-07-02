import mongoose from "mongoose";

const TimeSheetScheme = new mongoose.Schema({
        employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        },
        project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
        },
        date: {
        type: Date,
        required: true,
        },
        hours: {
        type: Number,
        required: true,
        },
        description: String,
        submittedAt: {
        type: Date,
        default: Date.now,
        },
})