import express from "express";
import { getTimesheetsForProject, submitTimesheet } from "../controllers/timeSheetController.js";

export const timeSheetRouter = express.Router();

// timesheet post:
timeSheetRouter.post('/', submitTimesheet)

// timesheet get:
timeSheetRouter.get('/project/:projectId', getTimesheetsForProject)