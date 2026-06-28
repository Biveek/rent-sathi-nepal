import axios from "./axios";

export const getAllUsers         = () => axios.get("/users");
export const getAllVerifications = () => axios.get("/verification/all");
export const decideVerification = (id, action, reason) =>
  axios.put(`/verification/${id}/decide`, { action, reason });