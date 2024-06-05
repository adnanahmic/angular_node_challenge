import { Response, NextFunction } from "express";
import { REQUEST_TYPE } from "../types/request.type";

const express = require("express");
const validate = require("../middlewares/validate");
const router = express.Router();
const rules = require("../helpers/validations/message.rules");
const authenticateUser = require("../middlewares/user.authenticate");

router.post(
  "/",
  async function _listmessage(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await require("../controller/message/list.message")(
        req.body
      );
      return res.json({
        data,
        message: "A list of messages.",
        status: 200,
        statusText: "SUCCESS",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/create",
  authenticateUser,
  validate(rules.CREATE_MESSAGE),
  async function _createmessage(
    req: REQUEST_TYPE,
    res: Response,
    next: NextFunction
  ) {
    try {
      const payload = req.body;
      payload.fromUserId = req.user.user._id;
      const data = await require("../controller/message/create.message")(
        req.body
      );
      return res.json({
        data,
        message: "Message sent successfully.",
        status: 200,
        statusText: "SUCCESS",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
