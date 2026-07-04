import axios from "./axios";

export const login = async (data) => {
  return await axios.post("/auth/login", data);
};

export const signup = async (data) => {
  return await axios.post("/auth/register", data);
};