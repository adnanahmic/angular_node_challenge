import { Request, Response, NextFunction } from "express";
import { RESPONSE_TYPE } from "../types/response.type";

const errorHandler = (
  err: RESPONSE_TYPE,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status: number = err.status || 500;
  const data: any = err.data || {};
  const message: string = err.message || "Something went wrong";
  const statusText: string = err.statusText || "BAD_REQUEST";

  return res.status(status).json({ data, message, status, statusText });
};

module.exports = errorHandler;
