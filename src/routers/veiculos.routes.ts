import { Router } from "express";
import { YupVerification } from "../schemas/serializer.schema";
import { VeiculoSchema } from "../schemas/users";
import { VehicleUpdateController, createVehicleController, deleteVehicleController, getAllVehicleController } from "../controller/Vehicles.controllers";
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware";




const veiculoRouter = Router()

veiculoRouter.post('',YupVerification(VeiculoSchema),verifyTokenValidationMiddleware,createVehicleController)
veiculoRouter.get('',verifyTokenValidationMiddleware,getAllVehicleController)
veiculoRouter.get('/:id',verifyTokenValidationMiddleware,getAllVehicleController)
veiculoRouter.delete('/:id',verifyTokenValidationMiddleware,deleteVehicleController)
veiculoRouter.patch('/:id',verifyTokenValidationMiddleware,VehicleUpdateController)





export default veiculoRouter;


