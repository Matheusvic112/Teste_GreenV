import { Router } from "express"

import { loginController } from "../controller/Login.controllers"
import { verifyLoginMiddleware } from "../middlewares/login/verifyLogin.middleware"
import { YupVerification } from "../schemas/serializer.schema"
import { loginSchema } from "../schemas/users"

const loginRouter = Router()

loginRouter.post(
  "",
  YupVerification(loginSchema),
  verifyLoginMiddleware,
  loginController
)

export default loginRouter
