import mongoose from "mongoose";
import { MessageDocument } from "../types/models.types/message.type";

const messageSchema = new mongoose.Schema<MessageDocument>(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model<MessageDocument>("Message", messageSchema);

module.exports = Message;
