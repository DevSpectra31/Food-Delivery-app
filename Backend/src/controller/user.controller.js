import { User } from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import cookie from "cookie-parser"
// register user
export const registerUser = async(req,res)=>{
    try {
    const {name,email,password,role}=req.body
    const existedUser = await User.findOne({email})
    if(existedUser){
        return res.status(404).json({
            message : "user already registered with same email"
        })
    }
    if(!validator.isEmail(email)){
        return res.status(404).json({
            message : "enter a valid email"
        })
    }
    if(password.length < 8){
        return res.status(404).json({
            message : "Please enter a strong password"
        })
    }
    const user = await User.create({
        name : name,
        email:email,
        password : password,
        role : role,
    })
    const token = user.generateToken()
    const createduser = await User.findById(user._id).select("-password")
    return res
       .cookie("token", token)
       .status(200)
       .json({
        message : "user registered successfully",
        createduser,
    })
}
catch (error){
    console.error("Error : ",error)
    message : message.error
}
}
export const loginUser = async (req, res) => {
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
    .cookie("token", token, { httpOnly: true })
    .json({
      message: "user logged in successfully",
      user: existedUser,
      success:true,
      token,
      role:existedUser.role,
    });
}