import { Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwtToken";
import { REQUEST_TYPE } from "../types/request.type";

const User = require("../models/User");
const HttpError = require("../helpers/HttpError");

const authenticateUser = async (
  req: REQUEST_TYPE,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.headers.authorization) {
      throw new HttpError(401, null, "Token missing", "BAD_REQUEST");
    }
    const authHeader = req.headers.authorization.split(" ")[1];
    const decodedToken = await verifyToken(authHeader);
    req.user = decodedToken;
    const user = await User.findOne({ _id: decodedToken.user._id });
    if (!user) {
      throw new HttpError(404, null, "User not found", "NOT_FOUND");
    }
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      next(new HttpError(401, null, "Token expired", "BAD_REQUEST"));
    } else if (error.name === "JsonWebTokenError") {
      next(new HttpError(401, null, "Invalid Token", "BAD_REQUEST"));
    } else {
      next(error);
    }
  }
};

module.exports = authenticateUser;
