import Booking from "../models/booking.model.js";
import { BOOKING_STATUS_CONFIRMED , BOOKING_STATUS_CANCELED} from "../constants/bookingStatus.js";


const getBookings = async () => {
  return await Booking.find().sort({createdAt: -1});

  };
const getBookinByID = async (Id) => {
  return await Booking.findById(Id);

 };

const createBooking = async(data) => {
  return  await Booking.create(data);

};
const updateBookingStatus = async (id, status) => {
  return await Booking.findByIdAndUpdate(id, {status}, {new: true});
};

const cancelBooking = async(id) => {
  return  await Booking.findByIdAndUpdate(
    id,
    {status: BOOKING_STATUS_CANCELED},
    {new: true},
  );
};
const deleteBooking = async(id) => {
  return await Booking.findByIdAndDelete(id);
};

//payment
const confirmedBooking = async(id) => {

return await Booking.findByIdAndUpdate(id,
  {status: BOOKING_STATUS_CONFIRMED},
  {new: true},
);
};
const getBookingsByUser = () => {};
const getBookingsByOwner = () => {};




export default { getBookings,getBookinByID, createBooking, updateBookingStatus,cancelBooking,deleteBooking,confirmedBooking,getBookingsByUser,getBookingsByOwner };