import express from "express";
import bookingController from "../controllers/booking.controller.js";
import { ROLE_OWNER, ROLE_CUSTOMER,ROLE_ADMIN } from "../constants/roles.js";



const router = express.Router();

router.get("/", bookingController.getBookings);
router.get("/owenr", bookingController.getBookingsByOwner);
router.get("/user", bookingController.getBookingsByUser);
router.get("/:id", bookingController.getBookinByID);

router.post("/", bookingController.createBooking);

router.put("/:id/status", bookingController.updateBookingStatus);

router.patch("/:id/cancel", bookingController.cancelBooking);

router.put("/:id/confirm", bookingController.confirmedBooking);

router.delete("/:id", bookingController.deleteBooking);



export default router;