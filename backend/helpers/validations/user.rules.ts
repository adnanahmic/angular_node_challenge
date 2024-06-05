import { body as expressValidatorBody } from "express-validator";

const User = require("../../models/User");

const CREATE_USER = [
  expressValidatorBody("name")
    .trim()
    .notEmpty()
    .withMessage("Username cannot be empty"),
  expressValidatorBody("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email cannot be empty and must be a valid email address"),
  expressValidatorBody("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty"),
];

const LOGIN_USER = [
  expressValidatorBody("email")
    .trim()
    .notEmpty()
    .isEmail()
    .withMessage("Email cannot be empty and must be a valid email address"),
  expressValidatorBody("password")
    .trim()
    .notEmpty()
    .withMessage("Password cannot be empty"),
];

module.exports = { CREATE_USER, LOGIN_USER };
