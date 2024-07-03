import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv";

dotenv.config()
console.log(process.env.API_KEY,  process.env.API_SECRET, process.env.CLOUD_NAME)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:  process.env.API_SECRET
});

export { cloudinary };