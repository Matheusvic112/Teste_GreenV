import { Router } from "express";
import { YupVerification } from "../schemas/serializer.schema";
import { VeiculoPachtSchema, VeiculoSchema } from "../schemas/users";
import { VehicleUpdateController, createVehicleController, deleteVehicleController, getAllVehicleController } from "../controller/Vehicles.controllers";
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware";
import { verifyPatchAndDeleteMiddleware } from "../middlewares/user/verifyUpdateAndDelete.middleware";
import { verifyPatchBodyMiddleware } from "../middlewares/verifyPatchBody.middleware";




const veiculoRouter = Router()

veiculoRouter.post('/:id',YupVerification(VeiculoSchema),verifyTokenValidationMiddleware,createVehicleController)
veiculoRouter.get('',verifyTokenValidationMiddleware,getAllVehicleController)
veiculoRouter.get('/:id',verifyTokenValidationMiddleware,getAllVehicleController)
veiculoRouter.delete('/:id',verifyTokenValidationMiddleware,verifyPatchAndDeleteMiddleware,deleteVehicleController)
veiculoRouter.patch('/:id',YupVerification(VeiculoPachtSchema),verifyTokenValidationMiddleware,verifyPatchAndDeleteMiddleware,verifyPatchBodyMiddleware,VehicleUpdateController)


export default veiculoRouter;
