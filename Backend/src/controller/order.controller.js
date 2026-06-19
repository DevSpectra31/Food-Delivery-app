import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";
import foodModel from "../model/food.model.js";
import Razorpay from "razorpay"

export const placeOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_API_KEY,
      key_secret: process.env.RAZORPAY_SECRET_API_KEY,
    });

    let totalAmount = 0;
    let orderItems = [];

    for (const item of req.body.items) {
      const food = await foodModel.findById(item.foodId);

      if (!food) {
        return res.status(404).json({
          success: false,
          message: `Food not found: ${item.foodId}`,
        });
      }

      orderItems.push({
        foodId: food._id,
        name: food.name,
        price: food.price,
        quantity: item.quantity,
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
      receipt: `order_${order._id}`,
    });

    res.status(200).json({
      success: true,
      orderId: order._Id,
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
    const { orderId, success } = req.body;
    console.log("received order : ",orderId)
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (success === true) {
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