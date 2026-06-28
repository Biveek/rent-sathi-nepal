import Review from "../models/review.model.js";

// Create a review
export const createReviewService = async (userId, data) => {
  const { rental_id, rating, comment } = data;

  if (!rental_id || !rating || !comment) {
    throw new Error("Please fill all fields");
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  // One review per user per rental
  const existing = await Review.findOne({ user_id: userId, rental_id });
  if (existing) {
    throw new Error("You have already reviewed this rental");
  }

  const review = await Review.create({
    user_id: userId,
    rental_id,
    rating,
    comment,
  });

  return review;
};

// Get all reviews for a rental
export const getRentalReviewsService = async (rentalId) => {
  const reviews = await Review.find({
    rental_id: rentalId,
    is_deleted: false,
  })
    .populate("user_id", "name email")
    .sort({ createdAt: -1 });

  return reviews;
};

// Get my reviews
export const getMyReviewsService = async (userId) => {
  const reviews = await Review.find({ user_id: userId, is_deleted: false })
    .populate("rental_id", "title city area price")
    .sort({ createdAt: -1 });

  return reviews;
};

// Edit a review
export const updateReviewService = async (reviewId, userId, data) => {
  const { rating, comment } = data;

  const review = await Review.findById(reviewId);

  if (!review) throw new Error("Review not found");

  // Only the review generator can edit
  if (review.user_id.toString() !== userId.toString()) {
    throw new Error("You are not authorized to edit this review");
  }

  if (review.is_deleted) {
    throw new Error("This review has been removed");
  }

  if (rating && (rating < 1 || rating > 5)) {
    throw new Error("Rating must be between 1 and 5");
  }

  review.rating = rating || review.rating;
  review.comment = comment || review.comment;
  await review.save();

  return review;
};

// Delete own review
export const deleteReviewService = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);

  if (!review) throw new Error("Review not found");

  if (review.user_id.toString() !== userId.toString()) {
    throw new Error("You are not authorized to delete this review");
  }

  await Review.findByIdAndDelete(reviewId);

  return { message: "Review deleted successfully" };
};

// Get all reviews (including deleted)
export const getAllReviewsAdminService = async () => {
  const reviews = await Review.find()
    .populate("user_id", "name email")
    .populate("rental_id", "title address")
    .sort({ createdAt: -1 });

  return reviews;
};

// Admin soft delete (hide a review)
export const adminDeleteReviewService = async (reviewId) => {
  const review = await Review.findById(reviewId);

  if (!review) throw new Error("Review not found");

  review.is_deleted = true;
  await review.save();

  return review;
};

// Admin restore a review
export const adminRestoreReviewService = async (reviewId) => {
  const review = await Review.findById(reviewId);

  if (!review) throw new Error("Review not found");

  review.is_deleted = false;
  await review.save();

  return review;
};