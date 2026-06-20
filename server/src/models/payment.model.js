import mongoose from "mongoose";
import {
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_CASH,
  PAYMENT_METHOD_ONLINE,
  PAYMENT_STATUS_FAILED,
  PAYMENT_STATUS_PENDING,
  PAYMENT_STATUS_SUCCESS,
} from "../constants/payment.js";
import { Timestamp } from "mongodb";

const paymentSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    default: "",
  },
  amount: {
    type: number,
    required: [true, "Amount is required"],
  },
  booking_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  user_id: {
    type: momgoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  method: {
    type: String,
    enum: [PAYMENT_METHOD_CARD, PAYMENT_METHOD_CASH, PAYMENT_METHOD_ONLINE],
    required: true,
  },
  status: {
    type: string,
    default: PAYMENT_STATUS_PENDING,
    enum: [
      PAYMENT_STATUS_PENDING,
      PAYMENT_STATUS_SUCCESS,
      PAYMENT_STATUS_FAILED,
    ],
  },

},{timestamps:true});
