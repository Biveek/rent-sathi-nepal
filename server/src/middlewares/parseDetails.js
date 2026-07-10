const parseDetails = (req, res, next) => {
  try {
    if (req.body.roomDetails) {
      req.body.roomDetails = JSON.parse(req.body.roomDetails);
    }

    if (req.body.vehicleDetails) {
      req.body.vehicleDetails = JSON.parse(req.body.vehicleDetails);
    }

    if (req.body.landDetails) {
      req.body.landDetails = JSON.parse(req.body.landDetails);
    }

    next();
  } catch (error) {
    return res.status(400).json({
      message: "Invalid JSON in details.",
    });
  }
};

export default parseDetails;