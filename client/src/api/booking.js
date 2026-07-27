import api from "./axios";

export const createBooking = async (data) => {
  const response = await api.post("/bookings", data);
  return response.data;
};

export const getMyBookings = async () => {
  const response = await api.get("/bookings/my");
  return response.data.data;
};

export const getOwnerBookings = async () => {
  const response = await api.get("/bookings/owner");
  return response.data.data;
};

export const updateBookingStatus = async (id, status) => {
  const response = await api.put(`/bookings/${id}/status`, { status });
  return response.data;
};

export const payBooking = async (bookingId, method) => {
  const response = await api.post(`/payment/${method}/${bookingId}`);
  return response.data;
};