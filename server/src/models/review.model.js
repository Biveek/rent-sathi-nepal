import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rental_id: {
    type: mongoose.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
  is_deleted: {
    type: Boolean,
    default: false, // soft delete — admin can hide without losing data
  },
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);