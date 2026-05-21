import vehicleService from "../services/vehicle.service.js";

const createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.getVehicles();

    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getVehicleById = async (req, res) => {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.id);

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.updateVehicle(
      req.params.id,
      req.body
    );

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteVehicle = async (req, res) => {
  try {
    await vehicleService.deleteVehicle(req.params.id);

    res.status(200).json({
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export default {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
};