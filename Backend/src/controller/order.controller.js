import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";
import foodModel from "../model/food.model.js";
import Razorpay from "razorpay"

export const placeOrder = async (req, res) => {
  try {
    console.log("controller hit")
    const userId = req.userId;
    console.log("userid : ",userId)
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET_API_KEY,
    });

    let totalAmount = 0;
    let orderItems = [];
    for (const item of req.body.items) {
      console.log(req.body.items)
      const food = await foodModel.findById(item._id);
      console.log("food : ",food)
      if (!food) {
        return res.status(404).json({
          success: false,
          message: `Food not found: ${item._id}`,
        });
      }

      orderItems.push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
        image : food.image,
      });

      totalAmount += food.price * item.quantity;
    }

    // delivery charge
    totalAmount += 20;

    const order = await Order.create({
      userId,
      items: orderItems,
      amount: totalAmount,
      address: req.body.address,
      payment: false,
    });

    await User.findByIdAndUpdate(userId, {
      cartData: {},
    });
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: order._id,
    });


    res.status(200).json({
      success: true,
      razorpayOrder,
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyorder = async (req, res) => {
  try {
    const {orderId,success} = req.body;
    console.log("order id : ",orderId)
    console.log("type of" , typeof(success))
   const order = await Order.findOne({_id : orderId})
   console.log("order : ",order)
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (success === true || success === "true") {
      await Order.findByIdAndUpdate(orderId, {
        payment: true,
      });

      return res.status(200).json({
        message: "Order verified successfully",
        success: true,
      });
    }

    await Order.findByIdAndDelete(orderId);

    return res.status(400).json({
      message: "Payment failed",
      success: false,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const listOrders = async (req, res) => {
  try {
    console.log("list order api hit ")
    const orders = await Order.find({}).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const userOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ date: -1 });
    res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    res.json({
      success: true,
      message: "Status updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};