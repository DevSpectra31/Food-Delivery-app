// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   const { token } = req.headers;
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized Login Again" });
//   }
//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     req.body.userId = token_decode.id;
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({success:false,message:"Error"});
//   }
// };
// export default authMiddleware;
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
   // console.log("===== AUTH MIDDLEWARE CALLED =====");

 // console.log("Headers:", req.headers);
 // console.log("Cookies:", req.cookies);
  const token =  req?.headers.token;
 //console.log("Request URL:", req.originalUrl);
console.log("Token:", token);
  if (!token) {
    return res
    .status(404)
    .json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    //console.log("decoded_token : ",token_decode)
   //console.log(token_decode)
    req.userId = token_decode._id
    next();
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

export default authMiddleware;