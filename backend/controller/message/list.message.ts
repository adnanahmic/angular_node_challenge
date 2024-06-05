import { LIST_MESSAGE_PAYLOAD_TYPE } from "../../types/message.type";

const listQuery = require("../../helpers/listQuery");
const Message = require("../../models/Message");

async function list(params: LIST_MESSAGE_PAYLOAD_TYPE) {
  return await listQuery(params, Message);
}
module.exports = list;
