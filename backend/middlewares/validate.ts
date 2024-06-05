import { Request, Response, NextFunction } from "express";

const { validationResult } = require("express-validator");

const validate = (validations: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      await validation.run(req);
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    res.status(400).json({ errors: errors.array() });
  };
};

module.exports = validate;
