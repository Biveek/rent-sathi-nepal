import axios from "./axios";

export const login = async (data) => {
  const response = await axios.post("/auth/login", data);
  return response.data;
};

export const signup = async (data) => {
  const response = await axios.post("/auth/register", data);
  return response.data;
};
