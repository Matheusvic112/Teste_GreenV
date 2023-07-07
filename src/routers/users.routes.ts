import { Router } from "express"
import {
  UserDeleteController,
  UserUpdateController,
  addUserToCompanyController,
  addUserToVehicleController,
  createUserController,
  getAllUsersController,
  getUserIdController,
} from "../controller/User.controllers"
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware"
import { emailAndCpfMiddleware } from "../middlewares/user/verifyEmailAndCpf.middleware"
import { checkExistingDataMiddleware } from "../middlewares/user/verifyUpdateUser.middleware"
import { verifyPatchBodyMiddleware } from "../middlewares/verifyPatchBody.middleware"
import { YupVerification } from "../schemas/serializer.schema"
import { UserSchema } from "../schemas/users"

const userRouter = Router()

userRouter.post(
  "",
  YupVerification(UserSchema),
  emailAndCpfMiddleware,
  createUserController
)
userRouter.delete("/:id", verifyTokenValidationMiddleware, UserDeleteController)
userRouter.patch(
  "/:id",
  verifyTokenValidationMiddleware,
  verifyPatchBodyMiddleware,
  checkExistingDataMiddleware,
  UserUpdateController
)
userRouter.get("/:id", verifyTokenValidationMiddleware, getUserIdController)
userRouter.get("", verifyTokenValidationMiddleware, getAllUsersController)
userRouter.post(
  "/:id/companies/:idCompanie",
  verifyTokenValidationMiddleware,
  addUserToCompanyController
)
userRouter.post(
  "/:id/veiculos/:idVeiculo",
  verifyTokenValidationMiddleware,
  addUserToVehicleController
)

export default userRouter
