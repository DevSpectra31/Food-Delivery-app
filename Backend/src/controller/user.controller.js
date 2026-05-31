import userModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { connectdb } from "../db/index.js"; // ✅ import redis client

// helper
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // ✅ check redis cache first before hitting MongoDB
    const cachedUser = await connectdb.get(`user:${email}`);
    if (cachedUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // check in MongoDB
    const exists = await userModel.findOne({ email });
    if (exists) {
      // ✅ cache it so next time we don't hit MongoDB
      await connectdb.set(`user:${email}`, JSON.stringify(exists), { EX: 3600 });
      return res.json({ success: false, message: "User already exists" });
    }

    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter valid email" });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter strong password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // ✅ cache the newly registered user in Redis (expires in 1 hour)
    await connectdb.set(
      `user:${email}`,
      JSON.stringify({ _id: user._id, name, email, role: user.role }),
      { EX: 3600 }
    );

    const role = user.role;
    const token = createToken(user._id);

    res.json({ success: true, token, role });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { registerUser };