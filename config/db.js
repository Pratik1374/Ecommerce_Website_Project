import mongoose from "mongoose";
import colors from "colors"

const connectDB = async () => {
    try{
         const conn = await mongoose.connect(process.env.MONGO_URL,{dbName:"myEcom"});
        console.log(`Connected to MongoDB ${conn.connection.host}`.bgMagenta.black);
    }catch(error){
        console.log(`Error in MongoDB ${error}`.bgRed.white);
    }
}

export default connectDB;