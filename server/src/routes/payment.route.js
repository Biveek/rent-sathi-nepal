import express from "express";
import {
  payViaCash,
  confirmPayment,
} from "../controllers/payment.controller.js";
import { protect, ownerOnly } from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router();

// User — pay via cash for a booking
paymentRouter.post("/cash/:bookingId", protect, payViaCash);

// Owner — confirm cash payment after meeting
paymentRouter.post("/confirm", protect, ownerOnly, confirmPayment);

export default paymentRouter;
