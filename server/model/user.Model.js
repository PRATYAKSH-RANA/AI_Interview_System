import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 200, // 200 credits automatically assigned to new users
        required: true
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;