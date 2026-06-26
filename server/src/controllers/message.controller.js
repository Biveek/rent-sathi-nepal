import {
  sendMessageService,
  getConversationService,
  getInboxService,
  markAsReadService,
  deleteMessageService,
  getAllMessagesService,
  adminDeleteMessageService,
} from "../services/message.service.js";

export const sendMessage = async (req, res) => {
  try {
    const data = await sendMessageService(req.user._id, req.body);
    res.status(201).json({ success: true, message: "Message sent", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getConversation = async (req, res) => {
  try {
    const { otherId, listingId } = req.params;
    const data = await getConversationService(req.user._id, otherId, listingId);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getInbox = async (req, res) => {
  try {
    const data = await getInboxService(req.user._id);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const data = await markAsReadService(req.params.id, req.user._id);
    res.json({ success: true, message: "Message marked as read", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const data = await deleteMessageService(req.params.id, req.user._id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllMessages = async (req, res) => {
  try {
    const data = await getAllMessagesService();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const adminDeleteMessage = async (req, res) => {
  try {
    const data = await adminDeleteMessageService(req.params.id);
    res.json({ success: true, message: data.message });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};