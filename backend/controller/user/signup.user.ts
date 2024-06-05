import { SIGNUP_TYPE } from "../../types/auth.type";

const bcrypt = require("bcrypt");
const { generateToken } = require("../../helpers/jwtToken");
const User = require("../../models/User");

async function signUp(params: SIGNUP_TYPE) {
  const { name, email, password } = params;
  let newUser = new User({ name, email });
  const hashedPassword = await bcrypt.hash(password, 10);
  newUser.password = hashedPassword;
  const user = await newUser.save();
  await generateToken({ _id: user._id, email: user.email });
  return true;
}
module.exports = signUp;
