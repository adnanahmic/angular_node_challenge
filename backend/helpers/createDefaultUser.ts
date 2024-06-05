import { SIGNUP_TYPE } from "../types/auth.type";
const bcrypt = require("bcrypt");

const User = require("../models/User");

const createDefaultUser = async (params: SIGNUP_TYPE[]) => {
  try {
    const bulkOps = await Promise.all(
      params.map(async (userParams) => {
        const { name, email, password } = userParams;
        const hashedPassword = await bcrypt.hash(password, 10);
        return {
          updateOne: {
            filter: { email },
            update: { $setOnInsert: { name, email, password: hashedPassword } },
            upsert: true,
          },
        };
      })
    );

    await User.bulkWrite(bulkOps);
  } catch (error) {
    console.error("Error creating/updating users:", error);
  }
};

module.exports = createDefaultUser;
