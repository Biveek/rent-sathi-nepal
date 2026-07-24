import express from "express";
import Listing from "../models/listing.model.js";
import {
  getListings,
  createDummyListings,
  getMyListings,
  createListing,
  getListingById,
  updateListing,
  deleteListing,
} from "../controllers/listing.controller.js";
import { protect } from "../middlewares/authMiddleware.js";
import validate from "../middlewares/validate.js";
import { listingSchema } from "../utils/validators.js";
import upload from "../middlewares/upload.js";
import parseDetails from "../middlewares/parseDetails.js";

const listingRoutes = express.Router();

listingRoutes.get("/", getListings);

listingRoutes.get("/my", protect, getMyListings);

listingRoutes.get("/seed", createDummyListings);

listingRoutes.get("/:id", getListingById);

// Protected — must be logged in
listingRoutes.post(
  "/",
  protect,
  upload.array("images", 10),
  parseDetails,
  validate(listingSchema),
  createListing,
);

listingRoutes.put(
  "/:id",
  protect,
  upload.array("images", 10),
  parseDetails,
  validate(listingSchema),
  updateListing,
);

listingRoutes.delete("/:id", protect, deleteListing);

// router.get("/debug", async (req, res) => {
//   const all = await Listing.find({});
//   res.json({ count: all.length, data: all });
// });
// router.get("/fix-status", async (req, res) => {
//   await Listing.updateMany({}, { $set: { status: "active" } });
//   res.json({ message: "All listings set to active" });
// });

export default listingRoutes;
