import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import { PAYMENT_STATUS_PENDING, PAYMENT_STATUS_SUCCESS } from "../constants/payment.js";

export const getBookingForPayment = async (bookingId, userId) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw { status: 404, message: "Booking not found" };
  }
  if (booking.user_id.toString() !== userId.toString()) {
    throw { status: 403, message: "Not your booking" };
  }
  if (booking.status !== PAYMENT_STATUS_PENDING) {
    throw { status: 400, message: "This booking does not require payment" };
  }
  return booking;
};


export const payViaCash = async (req, res) => {
  try {
    const booking = await getBookingForPayment(req.params.bookingId, req.user._id);
    const payment = await Payment.create({
      booking_id:    booking._id,
      user_id:       req.user._id,
      method:        PAYMENT_METHOD_CASH,
      amount:        booking.advance_amount,
      status:        PAYMENT_STATUS_PENDING, //cash confirmed  by owner later
      transactionId: `CASH-${Date.now()}`,
    });

    await Booking.findByIdAndUpdate(booking._id, { payment: payment._id });
    res.status(201).json({
      success: true,
      message: "Cash payment recorded. Owner will confirm on meeting.",
      data: payment,
    });

  } catch (err) {
    res.status(err.status || 500).json({ message: err.message });
  }
};