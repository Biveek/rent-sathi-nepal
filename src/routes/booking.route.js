import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  createBooking,
  getMyBookings,
  getOwnerBooking,
  payAdvance,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

const bookingRouter = express.Router();

bookingRouter.post("/", protect, createBooking);
bookingRouter.get("/my", protect, getMyBookings);
bookingRouter.get("/owner", protect, getOwnerBooking);

bookingRouter.put("/:id/status", protect, updateBookingStatus);
bookingRouter.put("/:id/pay", protect, payAdvance);


export default bookingRouter;