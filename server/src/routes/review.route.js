import express from "express";
import {
  createReview,
  getRentalReviews,
  getMyReviews,
  updateReview,
  deleteReview,
  getAllReviewsAdmin,
  adminDeleteReview,
  adminRestoreReview,
} from "../controllers/review.controller.js";
import { protect, admminOnly } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { createReviewSchema, updateReviewSchema } from "../utils/validators.js";

const reviewRoute = express.Router();

// User routes
reviewRoute.post("/", protect, validate(createReviewSchema), createReview);
reviewRoute.get("/my", protect, getMyReviews);
reviewRoute.get("/rental/:rentalId", getRentalReviews); // public
reviewRoute.put("/:id", protect, validate(updateReviewSchema), updateReview);
reviewRoute.delete("/:id", protect, deleteReview);

// Admin routes
reviewRoute.get("/admin/all", protect, admminOnly, getAllReviewsAdmin);
reviewRoute.patch("/admin/:id/hide", protect, admminOnly, adminDeleteReview);
reviewRoute.patch("/admin/:id/restore", protect, admminOnly, adminRestoreReview);

export default reviewRoute;