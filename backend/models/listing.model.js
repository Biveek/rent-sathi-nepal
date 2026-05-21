import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
    owner_id:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
    title:{
        type:String,
        required:[true,"Title is required"]
    },
    description:{
        type:String,
        required:[true,"Description is required"]

    },
    category:{
        type:String,
        enum:["room","vehicle","service"],
        required:[true,"Category is required"]
    },
    price:{
        type:Number,
        required:true
    },
    price_unit:{
        type:String,
        enum:['per_hour','per_day','per_month','per_year'],
        default:'per_day'
    },
    city: {
      type: String,
      required: true,
    },
    area:{
        type:String,
        default:'',
    },
    images:{
        type:[String],
        default:[],
    },
    status:{
        type:String,
        enum:["active", "inactive", "removed"],
        default:'active'
    }
},{timestamps:true});

export default mongoose.model("Listing",listingSchema);