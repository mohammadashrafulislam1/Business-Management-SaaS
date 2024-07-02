import mongoose from "mongoose";

const TimeSheetSchema = new mongoose.Schema({
        employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        },
        project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
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
export const TimesheetModel = mongoose.model('timesheet', TimeSheetSchema);