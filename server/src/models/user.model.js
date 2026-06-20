import mongoose from "mongoose";
import { ROLE_CUSTOMER, ROLE_OWNER, ROLE_ADMIN, ROLE_SUPER_ADMIN } from "../constants/roles.js";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name is required"],
        
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minlength:6,
    },
    phone:{
        type:String,
        default:''        
    },

    role:{
        type:String,
        enum:[ROLE_CUSTOMER, ROLE_OWNER, ROLE_ADMIN, ROLE_SUPER_ADMIN],
        default:ROLE_CUSTOMER
    },
    is_verified_owner:{
        type:Boolean,
        default:false
    },
    trust_score:{
        type:Number,
        default:0
    },
    profile_photo:{
        type:String,
        default:''
    },
},{timestamps:true});

export default mongoose.model("User",userSchema);