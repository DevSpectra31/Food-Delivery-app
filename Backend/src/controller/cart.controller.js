import foodModel from "../model/food.model.js";
import { User } from "../model/user.model.js";
//add to cart
export const addtocart = async (req, res) => {
    try {
        const userData = await User.findById(req.userId)
        let cartData = userData.cartData || {}
        const itemId=req.body.itemId
        const food = await foodModel.findById(itemId)
        // console.log("User :",userData)
         console.log("CartData : ",userData.cartData)
        // console.log("Type : ",typeof userData.cartData)
        //if food exists
        if(!food){
            return res.status(404).json({
                message : "food not found"
            })
        }
        if (!cartData[req.body.itemId]) {
            cartData[itemId]= 1;
        } else {
        cartData[itemId] +=1;
        }
        const foodadded=await User.findByIdAndUpdate(req.userId,{cartData},
            {returnDocument : true}
        )
        // Save to DB and return response
        res
          .status(200)
          .json({
            message: "Item added to cart successfully ",
            cartData:User.cartData,
            success : true,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//remove from cart
export const removefromCart = async(req,res)=>{
    try {
   // console.log("remove called")
    const user = await User.findById(req.userId);
   // console.log("User detials :",user)
    const itemId = req.body.itemId;
    const cartData = user.cartData;
    const food = await foodModel.findById(itemId);
   // console.log("Food : ",food)
   // console.log("method : ",req.method)
    if(!food){
        return res.status(404).json({
            message : "food not found"
        })
    }
        if(cartData[itemId]>1){
            cartData[itemId] -= 1;
        }
        else{
            delete cartData[itemId]
        }
        const foodremoved=await User.findByIdAndUpdate(req.userId,{cartData},{returnDocument : true})
        res.status(200).json({
            message : "Item removed from cart successfully",
            cartData,
            success:true,
        })
} catch (error){
    res.status(500).json({ message: error.message });
}
}

export const getCartItems = async (req, res) => {
    try{
        const user = await User.findById(req.userId);
        const cartData = user.cartData ;
        if(!cartData){
            return res.status(200).json({
                message : "user cartdaata is empty"
            })
        }
        res.status(200).json(
        { success: true,
            message: "Cart items fetched successfully",
            success:true,
            cartData:user.cartData || {}
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}