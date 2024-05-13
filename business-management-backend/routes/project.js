import express from "express";
import { projectModel } from "../models/Project";

export const projectRouter = express.Router();

projectRouter.post('/', projectModel)