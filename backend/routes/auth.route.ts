import { Response, NextFunction } from "express";

const express = require("express");
const validate = require("../middlewares/validate");
const rules = require("../helpers/validations/user.rules");
const router = express.Router();

router.post(
  "/signup",
  validate(rules.CREATE_USER),
  async function _signup(req: Request, res: Response, next: NextFunction) {
    try {
      await require("../controller/user/signup.user")(req.body);
      return res.json({
        data: null,
        message: "User created successfully.",
        status: 200,
        statusText: "SUCCESS",
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/signin",
  validate(rules.LOGIN_USER),
  async function _signin(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await require("../controller/user/signin.user")(req.body);
      return res.json({
        data,
        message: "User loggedIn successfully.",
        status: 200,
        statusText: "SUCCESS",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
