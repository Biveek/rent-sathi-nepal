import Payment from "../models/payment.model.js";
import Booking from "../models/booking.model.js";
import { PAYMENT_STATUS_PENDING, PAYMENT_STATUS_SUCCESS } from "../constants/payment.js";

export const initiatePayment = async (req, res) => {
  try {
    const { booking_id, method } = req.body;

    if (!booking_id || !method) {
      return res.status(400).json({
        message: "Booking ID and method are required",
      });
    }

    const booking = await Booking.findById(booking_id);
    if (!booking) {
        return res.status(404).json({message:"Booking not found"})
    }
    if(booking.user_id.toString() !== req.user._id.toString()){
        return res.status(403).json({message:"Not your booking"})
    }

    if(booking.status !== PAYMENT_STATUS_PENDING){
        return res.status(403).json({message:"This booking does not require payment"})
    }
    const existing = await Payment.findOne({booking_id,status:PAYMENT_STATUS_SUCCESS});
    if(existing){
        return res.status(400).json({message:"Payment already completed for this booking"});
    }

    const payment = await Payment.create({
        booking_id,
        user_id: req.user._id,
        amount: booking.advance_amount,
        method,
        status: PAYMENT_STATUS_PENDING,
        transaction_id:  `TXN-${Date.now()}`
    })

    res.status(201).json({
        success:true,
        message:"Payment initiated. Proceed to verify",
        data:payment,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
