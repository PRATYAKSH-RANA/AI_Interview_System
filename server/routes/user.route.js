import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getUser } from "../controllers/user.controller.js";



const UserRouter = express.Router();

UserRouter.get("/current-user",isAuth,getUser)

export default UserRouter;

