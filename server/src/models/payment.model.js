import mongoose from "mongoose";
import {
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_SUCCESS,
} from "../constants/payment.js";

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    default: "",
  },
  amount: {
    type: Number,
    required: [true, "Amount is required"],
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  method: {
    type: String,
    enum: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE],
    required: true,
  },
  status: {
    type: String,
    default: PAYMENT_STATUS_PENDING,
    enum: [
      PAYMENT_STATUS_PENDING,
      PAYMENT_STATUS_SUCCESS,
      PAYMENT_STATUS_FAILED,
    ],
  },

},{timestamps:true});


export default mongoose.model("Payment",paymentSchema);