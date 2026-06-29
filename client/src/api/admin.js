import axios from "./axios";

export const getAll         = () => axios.get("/users");
export const getAllVerifications = () => axios.get("/verify/all");
export const decideVerification = (id, action, reason) =>
axios.put(`/verification/${id}/decide`, { action, reason });
