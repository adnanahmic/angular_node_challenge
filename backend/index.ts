import { Request, Response, NextFunction } from "express";

require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const publicRoute = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors()); //allow for all origins

app.use("/api/v1/public", publicRoute);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});
app.use(errorHandler);

const PORT: number = parseInt(process.env.PORT!) || 3000;
app.listen(PORT, () => {
  require("./models");
  console.log(`Server is running on port ${PORT}.`);
  require("./services/database");
});

module.exports = app;
