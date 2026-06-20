import axios from "axios";
import config from "@/config";

export const login = async (data) => {
  const response = await axios.post(`${config.apiUrl}/api/auth/login`, data);
};

export const signup = async (data) => {
  const response = await axios.post(`${config.apiUrl}/api/auth/login`, data);
};
