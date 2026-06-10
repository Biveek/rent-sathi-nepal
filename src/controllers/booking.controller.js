import Listing from "../models/listing.model.js";
import Booking from "../models/booking.model.js";
import bookingService from "../services/booking.service.js";

export const createBooking = async (req, res) => {
  try {
    const { listing_id, start_date, end_date, message } = req.body;
    if (!listing_id || !start_date || !end_date) {
      return res.status(400).json({ message: "Please fill all fields" });
    }
    const listing = await Listing.findById(listing_id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const total_amount = days * listing.price;
    const advance_amount = Math.round(total_amount * 0.3);

    const booking = await Booking.create({
      listing_id,
      user_id: req.user._id,
      owner_id: listing.owner_id,
      start_date,
      end_date,
      total_amount,
      advance_amount,
      message,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const booking = await Booking.find({ user_id: req.user._id })
      .populate("listing_id", "title city area price images")
      .populate("owner_id", "name")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOwnerBooking = async (req, res) => {
  try {
    const booking = await Booking.find({ owner_id: req.user._id })
      .populate("listing_id", "title city area price images")
      .populate("user_id", "name phone")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: bookings });
  } catch (error) {}
};

export const updateBookingStatus = async (req,res)=>{
  try {

    const {status} = req.body;

    if(!["accepted","rejected"].includes(status)){
      return res.status(400).json({ message: "Invalid status" });
    }
    
    const booking = await Booking.findById(req.params.id);
    if(!booking){
      return res.status(404).json({message:"Booking not found"})
    }
    if(booking.owner_id.toString() !== req.user._id.toString()){
      return res.status(403).json({message:"Not your booking"}) 
    }


    booking.status = status === "accepted"?"payment_pending":"rejected";
    await booking.save();
    res.json({success:true, data:booking})
  } catch (err) {
    return res.status(500).json({ message: err.message });
    
  }
}

// ── User: pay advance (simulated) ──────────────
export const payAdvance = async (req, res) => {
  try {
    const { method } = req.body; // esewa, khalti, cash

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // only the user who made the booking can pay
    if (booking.user_id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your booking" });
    }

    // can only pay if owner has accepted
    if (booking.status !== "payment_pending") {
      return res.status(400).json({ message: "Payment not required yet" });
    }

    // simulate payment — just confirm it
    booking.status = "confirmed";
    await booking.save();

    res.json({
      success: true,
      message: `Payment of Rs ${booking.advance_amount} via ${method} confirmed`,
      data: booking,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
