import Message from "../models/message.model.js";
import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

// For Sending message
export const sendMessageService = async (senderId, data) => {
  const { receiver_id, listing_id, content } = data;

  if (!receiver_id || !listing_id || !content) {
    throw new Error("Receiver, listing and content are required");
  }

  // Check listing exists
  const listing = await Listing.findById(listing_id);
  if (!listing) throw new Error("Listing not found");

  // Check receiver exists
  const receiver = await User.findById(receiver_id);
  if (!receiver) throw new Error("Receiver not found");

  const isOwner = listing.owner_id.toString() === senderId.toString();
  const isOwnerReceiver = listing.owner_id.toString() === receiver_id.toString();

  // User must message the owner of the listing only
  if (!isOwner && !isOwnerReceiver) {
    throw new Error("You can only message the owner of this listing");
  }

  // Owner can only reply after getting message from user
  if (isOwner) {
    const previousMessage = await Message.findOne({
      listing_id,
      receiver_id: senderId,
      sender_id: receiver_id,
    });
    if (!previousMessage) {
      throw new Error("You can only reply to users who messaged you first");
    }
  }

  const message = await Message.create({
    sender_id: senderId,
    receiver_id,
    listing_id,
    content,
  });

  return message;
};

// Get conversation between two users about a listing
export const getConversationService = async (userId, otherId, listingId) => {
  const messages = await Message.find({
    listing_id: listingId,
    $or: [
      { sender_id: userId, receiver_id: otherId },
      { sender_id: otherId, receiver_id: userId },
    ],
  })
    .populate("sender_id", "name profile_photo")
    .populate("receiver_id", "name profile_photo")
    .sort({ createdAt: 1 }); // for generating new chat always at last

  return messages;
};

// Get inbox — all unique conversations for logged in user
export const getInboxService = async (userId) => {
  const messages = await Message.find({
    $or: [{ sender_id: userId }, { receiver_id: userId }],
  })
    .populate("sender_id", "name profile_photo")
    .populate("receiver_id", "name profile_photo")
    .populate("listing_id", "title city area")
    .sort({ createdAt: -1 });

  // Group by listing_id + other person to show unique conversations
  const seen = new Set();
  const inbox = messages.filter((msg) => {
    const otherId =
      msg.sender_id._id.toString() === userId.toString()
        ? msg.receiver_id._id.toString()
        : msg.sender_id._id.toString();

    const key = `${msg.listing_id?._id}-${otherId}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return inbox;
};

// Mark message as read
export const markAsReadService = async (messageId, userId) => {
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  // Only receiver can mark as read
  if (message.receiver_id.toString() !== userId.toString()) {
    throw new Error("You are not authorized to mark this message as read");
  }

  message.is_read = true;
  await message.save();

  return message;
};

// Delete a message
export const deleteMessageService = async (messageId, userId) => {
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  // Only sender can delete their own message
  if (message.sender_id.toString() !== userId.toString()) {
    throw new Error("You are not authorized to delete this message");
  }

  await Message.findByIdAndDelete(messageId);
  return { message: "Message deleted successfully" };
};

// Admin — get all messages
export const getAllMessagesService = async () => {
  const messages = await Message.find()
    .populate("sender_id", "name email")
    .populate("receiver_id", "name email")
    .populate("listing_id", "title city")
    .sort({ createdAt: -1 });

  return messages;
};

// Admin — delete any message
export const adminDeleteMessageService = async (messageId) => {
  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found");

  await Message.findByIdAndDelete(messageId);
  return { message: "Message deleted by admin" };
};