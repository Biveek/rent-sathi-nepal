import mongoose from "mongoose"

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
        enum:['CUSTOMER','OWNER','ADMIN'],
        default:"CUSTOMER"
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
const User = mongoose.model("User",userSchema);
export default User;