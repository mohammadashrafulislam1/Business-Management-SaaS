import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/user.js";
import { businessRouter } from "./routes/business.js";
import { projectRouter } from "./routes/project.js";
import { timeSheetRouter } from "./routes/timesheet.js";

dotenv.config()
const app = express();

app.use(cors())
app.use(express.json())
app.use('/user', userRouter);
app.use('/business', businessRouter)
app.use('/project', projectRouter)
app.use('/timesheet', timeSheetRouter)

const dbName ="business-management-saas"
try{
  await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.g2lboph.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
  console.log("connected DB")
}
catch (error){
   console.log(error)
}

app.listen(3000, ()=>{
    console.log("App is listening on port 3000.")
})