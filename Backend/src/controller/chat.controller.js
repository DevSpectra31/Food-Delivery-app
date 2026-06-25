import { askGemini } from "../Service/gemini.service.js";
import foodModel from "../model/food.model.js";
import { User } from "../model/user.model.js";
import { Order } from "../model/order.model.js";
export const chat = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message is required",
      });
    }

    // Fetch menu from MongoDB
    const foods = await foodModel.find({}, "name price category");

    const menu = foods
      .map((food) => `${food.name} - ₹${food.price}`)
      .join("\n");

    // Prompt
const prompt = `
You are Tomato AI Assistant.

Restaurant Menu:

${menu}

You are an AI assistant for a food delivery application.

Your task is to understand the customer's request and return ONLY valid JSON.

Do NOT explain anything.
Do NOT use markdown.
Do NOT use \`\`\`json.
Return only a JSON object.

Supported Intents:

1. Greeting

Example:
User: Hello

Response:
{
  "intent": "greeting"
}

----------------------------------

2. Recommend Food

Example:
User: Suggest food under ₹200

Response:
{
  "intent": "recommend_food",
  "budget": 200
}

----------------------------------

3. Add to Cart

Example:
User: Add 2 Veg Rolls to my cart

Response:
{
  "intent": "add_to_cart",
  "food": "Veg Roll",
  "quantity": 2
}

----------------------------------

4. Remove from Cart

Example:
User: Remove one Veg Roll from my cart

Response:
{
  "intent": "remove_from_cart",
  "food": "Veg Roll",
  "quantity": 1
}

----------------------------------

5. Track Order

Example:
User: Where is my order?

Response:
{
  "intent": "track_order"
}

----------------------------------

Rules:

- Food name must exactly match one of the restaurant menu items.
- If quantity is not mentioned, assume quantity = 1.
- Return ONLY JSON.
- Never wrap JSON inside markdown.
- Never add extra text.

Customer Request:

${message}
`;
    // Gemini Response
    const reply = await askGemini(prompt);

    // Remove markdown
    const cleanedReply = reply
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Parse JSON
    const intentData = JSON.parse(cleanedReply);

    switch (intentData.intent) {

      // ================= ADD TO CART =================
      case "add_to_cart": {

        const food = await foodModel.findOne({
          name: intentData.food,
        });

        if (!food) {
          return res.status(404).json({
            success: false,
            message: "Food not found",
          });
        }

        const user = await User.findById(req.userId);

        let cartData = user.cartData || {};

        if (cartData[food._id]) {
          cartData[food._id] += intentData.quantity;
        } else {
          cartData[food._id] = intentData.quantity;
        }

        await User.findByIdAndUpdate(
          req.userId,
          { cartData },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: `${intentData.quantity} ${food.name} added to cart`,
          cartData,
        });
      }

      // ================= REMOVE FROM CART =================
      case "remove_from_cart": {

        const food = await foodModel.findOne({
          name: intentData.food,
        });

        if (!food) {
          return res.status(404).json({
            success: false,
            message: "Food not found",
          });
        }

        const user = await User.findById(req.userId);

        let cartData = user.cartData || {};

        if (!cartData[food._id]) {
          return res.status(400).json({
            success: false,
            message: `${food.name} is not in your cart`,
          });
        }

        if (cartData[food._id] > intentData.quantity) {
          cartData[food._id] -= intentData.quantity;
        } else {
          delete cartData[food._id];
        }

        await User.findByIdAndUpdate(
          req.userId,
          { cartData },
          { new: true }
        );

        return res.status(200).json({
          success: true,
          message: `${intentData.quantity} ${food.name} removed from cart`,
          cartData,
        });
      }

      // ================= RECOMMEND FOOD =================
     case "recommend_food": {

  let query = {};

  // Budget filter
  if (intentData.budget) {
    query.price = { $lte: intentData.budget };
  }

  // Category filter
  if (intentData.category) {
    query.category = intentData.category;
  }

  const foods = await foodModel.find(query);

  if (foods.length === 0) {
    return res.status(404).json({
      success: false,
      message: "Sorry, I couldn't find any matching food."
    });
  }

  const recommendation = foods
    .map(food => `🍽️ ${food.name} - ₹${food.price}`)
    .join("\n");

  return res.status(200).json({
    success: true,
    message: recommendation
  });
}
      // ================= TRACK ORDER =================
   case "track_order": {

  const order = await Order.findOne({
    userId: req.userId,
  }).sort({ date: -1 });

  if (!order) {
    return res.status(404).json({
      success: false,
      message: "You haven't placed any orders yet.",
    });
  }

  let aiMessage = "";

  switch (order.status) {

    case "Food Processing":
      aiMessage =
        "👨‍🍳 Your food is currently being prepared in the kitchen.";
      break;

    case "Out for Delivery":
      aiMessage =
        "🚴 Your order is on the way and will arrive soon.";
      break;

    case "Delivered":
      aiMessage =
        "✅ Your order has been delivered successfully.";
      break;

    default:
      aiMessage = `Your order is currently ${order.status}.`;
  }

  return res.status(200).json({
    success: true,
    status: order.status,
    payment: order.payment,
    amount: order.amount,
    items: order.items,
    message: aiMessage,
  });
}

      // ================= GREETING =================
      case "greeting": {
        return res.status(200).json({
          success: true,
          message: "Hello! 👋 How can I help you today?",
        });
      }

      // ================= DEFAULT =================
      default:
        return res.status(200).json({
          success: false,
          message: "Sorry, I couldn't understand your request.",
          intentData,
        });
    }
    

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};