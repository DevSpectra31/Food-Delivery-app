import foodModel from "../model/food.model.js";
import {User} from "../model/user.model.js"
import fs from "fs";

// add food items

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  try {
    const userId=req.userId
    let userData = await User.findById(req.userId);
    console.log("user data : ",userData)
    if (userData && userData.role === "admin") {
        const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
      await food.save();
      res.json({ success: true, message: "Food Added",food,userId });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// all foods
const listFood = async (req, res) => {
  try {
    const userId=req.userId
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods ,userId});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
};

// remove food item
const removeFood = async (req, res) => {
  try {
  console.log("remove called")
  console.log("METHOD:", req.method);
  console.log("BODY:", req.body.id);
  console.log("USER:", req.userId);
    let userData = await User.findById(req.userId);
    console.log("User detials :",userData)
    // console.log("Food : ",req.body.id)
    if (userData && userData.role === "admin") {
      const food = await foodModel.findById(req.body.id);
      console.log("Food : ",food)
      fs.unlink(`uploads/${food.image}`, () => {});
      await foodModel.findByIdAndDelete(req.body.id);
      res.json({ success: true, message: "Food Removed" });
    } else {
      res.json({ success: false, message: "You are not admin" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, listFood, removeFood };