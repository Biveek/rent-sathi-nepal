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

const reviewRouter = express.Router();

// User routes
reviewRouter.post("/", protect, createReview);
reviewRouter.get("/my", protect, getMyReviews);
reviewRouter.get("/rental/:rentalId", getRentalReviews); // public
reviewRouter.put("/:id", protect, updateReview);
reviewRouter.delete("/:id", protect, deleteReview);

// Admin routes
reviewRouter.get("/admin/all", protect, admminOnly, getAllReviewsAdmin);
reviewRouter.patch("/admin/:id/hide", protect, admminOnly, adminDeleteReview);
reviewRouter.patch("/admin/:id/restore", protect, admminOnly, adminRestoreReview);

export default reviewRouter;