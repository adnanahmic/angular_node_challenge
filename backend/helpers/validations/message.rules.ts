const { body } = require("express-validator");
const { mongoose } = require("mongoose");

const CREATE_MESSAGE = [
  body("message").trim().notEmpty().withMessage("Message cannot be empty"),
  body("toUserId").trim().notEmpty().withMessage("Receiver cannot be empty"),
  body("toUserId").custom(async (value: String) => {
    if (!mongoose.Types.ObjectId.isValid(value))
      throw new Error("Receiver is not exist");
  }),
];

module.exports = { CREATE_MESSAGE };
