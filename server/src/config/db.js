import config from "./config.js";
import mongoose from "mongoose"

const connectDB = async ()=>{
    try{
       await mongoose.connect(config.mongo.url);
       console.log("MongoDB connected")
    }
    catch(err){
        console.error(err);
        process.exit(1);
    }
}

export default connectDB;