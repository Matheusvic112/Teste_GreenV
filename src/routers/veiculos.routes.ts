import { Router } from "express"
import {
  VehicleUpdateController,
  createVehicleController,
  deleteVehicleController,
  getAllVehicleController,
  removeUserVehicleController,
} from "../controller/Vehicles.controllers"
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware"
import { verifyPatchAndDeleteMiddleware } from "../middlewares/user/verifyUpdateAndDelete.middleware"
import { verifyPatchBodyMiddleware } from "../middlewares/verifyPatchBody.middleware"
import { YupVerification } from "../schemas/serializer.schema"
import { VeiculoPachtSchema, VeiculoSchema } from "../schemas/users"

const veiculoRouter = Router()

veiculoRouter.post(
  "/:id",
  YupVerification(VeiculoSchema),
  verifyTokenValidationMiddleware,
  createVehicleController
)
veiculoRouter.get("", verifyTokenValidationMiddleware, getAllVehicleController)
veiculoRouter.get(
  "/:id",
  verifyTokenValidationMiddleware,
  getAllVehicleController
)
veiculoRouter.delete(
  "/:id",
  verifyTokenValidationMiddleware,
  verifyPatchAndDeleteMiddleware,
  deleteVehicleController
)
veiculoRouter.patch(
  "/:id",
  YupVerification(VeiculoPachtSchema),
  verifyTokenValidationMiddleware,
  verifyPatchAndDeleteMiddleware,
  verifyPatchBodyMiddleware,
  VehicleUpdateController
)
veiculoRouter.delete(
  "/:id/users/:idVehicle",
  verifyTokenValidationMiddleware,
  removeUserVehicleController
)

export default veiculoRouter
