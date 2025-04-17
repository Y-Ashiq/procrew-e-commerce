import { Router } from "express";
import {userValidation,userLogin} from './user.validation.js'
import userController from "./user.controller.js";
import { validation } from "../../middleware/validate.js";

const userRouter = Router();

userRouter.post("/register", validation(userValidation),userController.register);
userRouter.post("/signIn",validation(userLogin), userController.signIn);


export default userRouter;