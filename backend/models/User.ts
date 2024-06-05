import mongoose from "mongoose";
import { UserDocument } from "../types/models.types/user.types";

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", userSchema);

module.exports = User;
