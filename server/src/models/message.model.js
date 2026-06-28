import mongoose from "mongoose";

 const messageSchema = new mongoose.Schema({
    sender_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver_id:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    listing_id:{
        type:mongoose.Types.ObjectId,
        ref:'Listing',
        default:null
    },
    content:{
        type:String,
        required:true
    },
    is_read:{
        type:Boolean,
        default:false
    },
 },{timestamps:true});

 export default mongoose.model("Message",messageSchema);
 