import {
  createReviewService,
  getRentalReviewsService,
  getMyReviewsService,
  updateReviewService,
  deleteReviewService,
  getAllReviewsAdminService,
  adminDeleteReviewService,
  adminRestoreReviewService,
} from "../services/review.service.js";

export const createReview = async (req, res) => {
  try {
    const data = await createReviewService(req.user._id, req.body);
    res.status(201).json({ success: true, message: "Review submitted", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getRentalReviews = async (req, res) => {
  try {
    const data = await getRentalReviewsService(req.params.rentalId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyReviews = async (req, res) => {
  try {
    const data = await getMyReviewsService(req.user._id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const data = await updateReviewService(req.params.id, req.user._id, req.body);
    res.json({ success: true, message: "Review updated", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const data = await deleteReviewService(req.params.id, req.user._id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Admin controllers
export const getAllReviewsAdmin = async (req, res) => {
  try {
    const data = await getAllReviewsAdminService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminDeleteReview = async (req, res) => {
  try {
    const data = await adminDeleteReviewService(req.params.id);
    res.json({ success: true, message: "Review hidden successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const adminRestoreReview = async (req, res) => {
  try {
    const data = await adminRestoreReviewService(req.params.id);
    res.json({ success: true, message: "Review restored successfully", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};