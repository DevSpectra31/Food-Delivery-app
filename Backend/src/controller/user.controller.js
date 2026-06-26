import { User } from "../model/user.model.js";
import validator from "validator";

// register user
export const registerUser = async (req, res) => {
  try {
    console.log("register controller hit")
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "name, email and password are required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "please enter a strong password" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({ message: "user already registered with same email" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    const token = user.generateToken();
    const createduser = await User.findById(user._id).select("-password -token");

    return res
      .status(200)
      .json({
        message: "user registered successfully",
        createduser,
        success : true,
      });
  } catch (error) {
    console.error("Error: ", error);
    return res.status(500).json({ message: error.message,
        success : false,
     });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "all fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "user does not exist" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid credentials" });
    }

    const token = user.generateToken();
    const existedUser = await User.findById(user._id).select("-password").lean();

    return res
      .status(200)
      .json({
        message: "user logged in successfully",
        user: existedUser,
        success: true,
        token,
        role: existedUser.role,
      });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ message: "user logged out successfully",
        success : true,
       });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: error.message });
  }
};