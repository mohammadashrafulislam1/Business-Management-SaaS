import { TimesheetModel } from "../models/TimeSheet";

// Submit a Timesheet
export const submitTimesheet = async (req, res) => {
    const { employeeId, projectId, date, hours, description } = req.body; //employeeId = userId 
    try {
    const timeSheet = new TimesheetModel({ employee: employeeId, project: projectId, date, hours, description });
    const savedTimesheet = await timeSheet.save();
    res.json(savedTimesheet);
    } catch (err) {
    res.status(400).json({ message: err.message });
    }
    }
    
    // Get all timesheets for a specific project
    export const getTimesheetsForProject = async (req, res) => {
    const projectId = req.params.projectId;
    try {
    const timesheets = await TimesheetModel.find({ project: projectId }).populate('employee', 'name');
    res.json(timesheets);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
    }