import { Router } from "express";
import userController from "./user.controller.js";

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/signIn", userController.signIn);


export default userRouter;