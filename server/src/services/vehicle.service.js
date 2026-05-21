import Vehicle from "../models/vehicle.js";

const createVehicle = async (data) => {
  return await Vehicle.create(data);
};

const getVehicles = async () => {
  return await Vehicle.find();
};

const getVehicleById = async (id) => {
  return await Vehicle.findById(id);
};

const updateVehicle = async (id, data) => {
  return await Vehicle.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteVehicle = async (id) => {
  return await Vehicle.findByIdAndDelete(id);
};

export default {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};