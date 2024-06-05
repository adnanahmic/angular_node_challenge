import mongoose from "mongoose";
import { userList } from "../data/defaultUserList";

const createDefaultUser = require("../helpers/createDefaultUser");

mongoose
  .connect(process.env.DB_URI as string)
  .then(async () => {
    console.log("DB connected");
    await createDefaultUser(userList);
  })
  .catch((err: Error) => {
    console.error("ERROR while connecting to DB", err);
  });
