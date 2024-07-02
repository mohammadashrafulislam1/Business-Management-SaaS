import { projectModel } from "../models/Project.js";
import { TimesheetModel } from "../models/TimeSheet.js";

// Submit a Timesheet
export const submitTimesheet = async (req, res) => {
    const { employeeId, projectId, description } = req.body;
    try {
        const project = await projectModel.findById(projectId);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        const hours = project.totalHours; // Use the total monitored hours

        const timesheet = new TimesheetModel({ employee: employeeId, project: projectId, hours, description });
        const savedTimesheet = await timesheet.save();
        res.json(savedTimesheet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}
    
    // Get all timesheets for a specific project
export const getTimesheetsForProject = async       (req, res) => {
    const projectId = req.params.projectId;
    try {
    const timesheets = await TimesheetModel.find({ project: projectId }).populate('employee', 'name');
    res.json(timesheets);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
}