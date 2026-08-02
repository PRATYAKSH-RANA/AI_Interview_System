import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { createOrder, verifyPayment } from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.post("/order", isAuth, createOrder);
paymentRouter.post("/verify", isAuth, verifyPayment); // Fixed to call verifyPayment

export default paymentRouter;