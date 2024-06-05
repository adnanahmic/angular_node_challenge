import { Request } from "express";

export interface REQUEST_TYPE extends Request {
  fromUserId?: string;
  user: {
    user: {
      _id?: string;
    };
  };
}
