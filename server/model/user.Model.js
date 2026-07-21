import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    credits:{
        type:Number,
        default:100, //100 credit free for taking 2 interviews
        required:true
    },
},{timestamps: true});

const User = mongoose.model("User", userSchema);
  

export default mongoose.model("User", userSchema);