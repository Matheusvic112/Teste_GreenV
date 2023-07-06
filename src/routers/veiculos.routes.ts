import { Router } from "express";
import { YupVerification } from "../schemas/serializer.schema";
import { VeiculoSchema } from "../schemas/users";
import { VehicleUpdateController, createVehicleController, deleteVehicleController, getAllVehicleController } from "../controller/Vehicles.controllers";




const veiculoRouter = Router()

veiculoRouter.post('',YupVerification(VeiculoSchema),createVehicleController)
veiculoRouter.get('',getAllVehicleController)
veiculoRouter.get('/:id',getAllVehicleController)

veiculoRouter.delete('/:id',deleteVehicleController)
veiculoRouter.patch('/:id',VehicleUpdateController)





export default veiculoRouter;


