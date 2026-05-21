import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  brand: {
    type: String,
    required: true,
  },

  vehicleType: {
    type: String,
    required: true,
  },

  pricePerDay: {
    type: Number,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  description: {
    type: String,
  },

  availability: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });


export default mongoose.model("Vehicle", vehicleSchema);