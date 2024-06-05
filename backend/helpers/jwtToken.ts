import jwt from "jsonwebtoken";
import { GENERATE_TOKEN_PAYLOAD_TYPE } from "../types/auth.type";

export const generateToken = async (
  data: GENERATE_TOKEN_PAYLOAD_TYPE
): Promise<string> => {
  const token: string = jwt.sign({ user: data }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1h",
  });
  return token;
};

export const verifyToken = async (token: string): Promise<any> => {
  const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  return decoded;
};

export const decodeToken = async (token: string): Promise<any> => {
  const decoded: any = jwt.decode(token);
  return decoded;
};
