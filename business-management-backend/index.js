import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const app = express();

app.use(cors())
app.use(express.json())
const dbName ="business-management-saas"
try{
  await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@cluster0.g2lboph.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`)
  console.log("connected DB")
}
catch (error){
   console.log(error)
}

app.get('/', ()=>{
    console.log("App is running.")
})

app.listen(8000, ()=>{
    console.log("App is listening on port 8000.")
})