import express from "express";
import { addBusiness, deleteBusiness, getBusiness, singleBusiness, updateBusiness } from "../controllers/businessController.js";
import { upload } from "../middleware/multer.js";

export const businessRouter = express.Router();

// POST API for business:
businessRouter.post('/', upload.single('logo'), addBusiness)

// GET API for businesses:
businessRouter.get('/', getBusiness)

// GET API for single business:
businessRouter.get('/:id', singleBusiness)

// PUT API for single business:
businessRouter.put('/:id', updateBusiness)

// DELETE API for business:
businessRouter.delete('/:id', deleteBusiness)