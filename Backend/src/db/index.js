import mongoose  from "mongoose";

const connectdb = async()=>{
    try {
        const uri = process.env.MONGO_URI;
        const connection = await mongoose.connect(uri);
        console.log("Mongodb connected successfully ")
    } catch (error) {
        return res.status(500).json({
            message: "mongodb not connected"
        })
    }
    
}
export {connectdb}