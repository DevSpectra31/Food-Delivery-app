import { Order } from "../model/order.model.js";
import { User } from "../model/user.model.js";
import foodModel from "../model/food.model.js";
import Stripe from "stripe";
const stripe  = new Stripe(process.env.STRIPE_SECRET_KEY) 
export const placeOrder=async(req,res)=>{
    const frontend_url="http://localhost:5173"
    try {
        const order = await Order.create({
            userId:req.body.userId,
            amount : req.body.amount,
            items:req.body.items,
            address: req.body.address,

        })
   await User.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${order._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${order._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};