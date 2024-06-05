import mongoose from "mongoose";

export interface MessageDocument {
  fromUserId: mongoose.Types.ObjectId;
  toUserId: mongoose.Types.ObjectId;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}
