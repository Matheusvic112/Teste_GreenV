import { Router } from "express";
import { createUserController, UserDeleteController, UserUpdateController, getUserIdController, getAllUsersController, addUserToCompanyController, addUserToVehicleController } from "../controller/User.controllers";
import { YupVerification } from "../schemas/serializer.schema";
import { UserSchema } from "../schemas/users";


const userRouter = Router()

userRouter.post('',YupVerification(UserSchema) ,createUserController)
userRouter.delete('/:id',UserDeleteController)
userRouter.patch('/:id',UserUpdateController)
userRouter.get('/:id',getUserIdController)
userRouter.get('',getAllUsersController)
userRouter.post('/:id/companies/:idCompanie',addUserToCompanyController)
userRouter.post('/:id/veiculos/:idVeiculo',addUserToVehicleController)



export default userRouter;

//44e0f24e-f4c2-4773-ba30-522ce9afc07b 
//44e0f24e-f4c2-4773-ba30-522ce9afc07b

//7f180c65-a087-47e0-8695-b538199b17cd