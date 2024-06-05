import { CREATE_MESSAGE_TYPE } from "../../types/message.type";

const HttpError = require("../../helpers/HttpError");
const Message = require("../../models/Message");
const User = require("../../models/User");

async function createMessage(params: CREATE_MESSAGE_TYPE) {
  const { fromUserId, toUserId, message } = params;
  if (fromUserId === toUserId)
    throw new HttpError(
      404,
      null,
      "Sender and recevier can not be same",
      "BAD_REQUEST"
    );
  const receiver = await User.findById({ _id: toUserId });
  if (!receiver)
    throw new HttpError(404, null, "Receiver not found", "NOT_FOUND");
  let newMessage = new Message({ fromUserId, toUserId, message });
  const newCreatedMessage = await newMessage.save();
  return newCreatedMessage;
}
module.exports = createMessage;
