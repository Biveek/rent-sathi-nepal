import mongoose from "mongoose"

const verificationSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true,
    },
    full_name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    citizenship_img:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['pending','approved','reject'],
        default:'pending'
    },
    rejection_reason:{
        type:String,
        required:true,
        default:''
    },
},{timestamps:true})

export default mongoose.model("Verification",verificationSchema)