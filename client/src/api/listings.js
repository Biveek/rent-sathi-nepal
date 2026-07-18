import api from "./axios";

export const getListings = async (params = {}) => {
  const response = await api.get("/listings", { params });
  return response.data.data;
};

export const getCategoryListings = async (category) => {
  const response = await api.get(`/listings?category=${category}`);
  return response.data.data;
};

export const getListingById = async (id) => {
  const response = await api.get(`/listings/${id}`);
  return response.data.data;
};
