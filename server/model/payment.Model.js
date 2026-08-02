import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    planId: String,
    amount: Number,
    credits: Number,
    razorpayOrderId: String,     // Fixed casing to match controller
    razorpayPaymentId: String,   // Fixed casing to match controller
    status: {
        type: String,
        enum: ["created", "paid", "failed"], // Aligned with controller logic
        default: "created"
    }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;