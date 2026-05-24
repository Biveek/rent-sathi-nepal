import express from "express";
import {
  applyForOwner,
  decideVerification,
  getAllVerifications,
  getMyVerification,
  getPendingVerifications,
} from "../controllers/verification.controller.js";
import { admminOnly, protect } from "../middleware/authMiddleware.js";

const verificationRouter = express.Router();

//user routes
verificationRouter.post("/apply", protect, applyForOwner);
verificationRouter.get("/my", protect, getMyVerification);

//admin must be protected and must be admin only

verificationRouter.get(
  "/pending",
  protect,
  admminOnly,
  getPendingVerifications,
);
verificationRouter.get('/all',protect,admminOnly,getAllVerifications);
verificationRouter.put('/:id/decide',protect,admminOnly,decideVerification);

export default verificationRouter;
