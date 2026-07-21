import mongoose from "mongoose";

const connectDB = async () => {
 try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
 }catch(error){
    console.log('databse error ${error}');
 }

};

export default connectDB;