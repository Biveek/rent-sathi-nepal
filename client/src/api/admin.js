import axios from "./axios";

export const getAll = () => axios.get("/users");
export const getAllVerifications = () => axios.get("/verify/all");
export const getAllListings      = () => axios.get("/listings");
export const decideVerification = (id, action, reason) =>
  axios.put(`/verify/${id}/decide`, { action, reason });
