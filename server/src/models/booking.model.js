import mongoose from "mongoose";
import {
  BOOKING_STATUS_CANCELED,
  BOOKING_STATUS_CONFIRMED,
  BOOKING_STATUS_PENDING,
} from "../constants/bookingStatus.js";

const bookingSchema = new mongoose.Schema(
  {
    listing_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    advance_amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "pending", // user just sent request
        "accepted", // owner accepted
        "rejected", // owner rejected
        "payment_pending", // accepted, waiting for payment
        "confirmed", // payment done
        "completed", // rental period over
        "cancelled", // user cancelled
      ],
      default: "pending",
    },
     message: {
      type: String,
      default: "",      // user's note to owner
    },
  },{ timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
