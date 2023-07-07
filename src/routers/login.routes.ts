import { Router } from "express";

import { YupVerification } from "../schemas/serializer.schema";
import {  loginSchema } from "../schemas/users";
import { verifyLoginMiddleware } from "../middlewares/login/verifyLogin.middleware";
import { loginController } from "../controller/Login.controllers";


const loginRouter = Router()

loginRouter.post('',YupVerification(loginSchema),verifyLoginMiddleware , loginController)



export default loginRouter;