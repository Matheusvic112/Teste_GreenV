import { Router } from "express";
import { createUserController, UserDeleteController, UserUpdateController, getUserIdController, getAllUsersController, addUserToCompanyController, addUserToVehicleController } from "../controller/User.controllers";
import { YupVerification } from "../schemas/serializer.schema";
import { UserSchema } from "../schemas/users";
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware";


const userRouter = Router()

userRouter.post('',YupVerification(UserSchema) ,createUserController)
userRouter.delete('/:id',verifyTokenValidationMiddleware,UserDeleteController)
userRouter.patch('/:id',verifyTokenValidationMiddleware,UserUpdateController)
userRouter.get('/:id',verifyTokenValidationMiddleware,getUserIdController)
userRouter.get('',verifyTokenValidationMiddleware,getAllUsersController)
userRouter.post('/:id/companies/:idCompanie',verifyTokenValidationMiddleware,addUserToCompanyController)
userRouter.post('/:id/veiculos/:idVeiculo',verifyTokenValidationMiddleware,addUserToVehicleController)



export default userRouter;

//44e0f24e-f4c2-4773-ba30-522ce9afc07b 
//44e0f24e-f4c2-4773-ba30-522ce9afc07b

//7f180c65-a087-47e0-8695-b538199b17cd