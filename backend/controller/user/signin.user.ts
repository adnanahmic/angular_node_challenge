import { LOGIN_TYPE } from "../../types/auth.type";

const User = require("../../models/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../../helpers/jwtToken");
const HttpError = require("../../helpers/HttpError");

async function signIn(params: LOGIN_TYPE) {
  const { email, password } = params;
  const user = await User.findOne({ email });
  if (!user) throw new HttpError(404, null, "User not exist", "NOT_FOUND");
  const match = bcrypt.compareSync(password, user.password);
  if (match) {
    const token = await generateToken({ _id: user._id, email: user.email });
    const newCreatedUser = await user.save();
    return {
      token,
      id: newCreatedUser._id,
      name: newCreatedUser.name,
      email: newCreatedUser.email,
    };
  }
}

module.exports = signIn;
