import { Router } from "express";
import {  addCompanyToVeiculoController, companyUpdateController, createCompanyController, deleteCompanyController, getAllCompanyCController, getIdCompanyCController } from "../controller/Companies.controllers";
import { YupVerification } from "../schemas/serializer.schema";
import { CompanySchema } from "../schemas/users";
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware";



const companiesRouter = Router()

companiesRouter.post('',YupVerification(CompanySchema),verifyTokenValidationMiddleware,createCompanyController)
companiesRouter.get('',verifyTokenValidationMiddleware,getAllCompanyCController)
companiesRouter.get('/:id',verifyTokenValidationMiddleware,getIdCompanyCController)
companiesRouter.delete(':id',verifyTokenValidationMiddleware,deleteCompanyController)
companiesRouter.patch('/:id' ,verifyTokenValidationMiddleware,companyUpdateController)
companiesRouter.post('/:id/veiculos/:idCompany' ,verifyTokenValidationMiddleware,addCompanyToVeiculoController)

export default companiesRouter;
