import express from "express";
import {
  sendMessage,
  getConversation,
  getInbox,
  markAsRead,
  deleteMessage,
  getAllMessages,
  adminDeleteMessage,
} from "../controllers/message.controller.js";
import { protect, admminOnly } from "../middlewares/authMiddleware.js";

const messageRouter = express.Router();

messageRouter.post("/", sendMessage);
messageRouter.get("/inbox", getInbox);
messageRouter.get("/conversation/:otherId/:listingId", getConversation);
messageRouter.patch("/:id/read", markAsRead);
messageRouter.delete("/:id", deleteMessage);

messageRouter.get("/admin/all", admminOnly, getAllMessages);
messageRouter.delete("/admin/:id", admminOnly, adminDeleteMessage);

export default messageRouter;