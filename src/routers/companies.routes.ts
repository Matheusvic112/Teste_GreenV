import { Router } from "express";
import {  addCompanyToVeiculoController, companyUpdateController, createCompanyController, deleteCompanyController, getAllCompanyCController, getIdCompanyCController } from "../controller/Companies.controllers";
import { YupVerification } from "../schemas/serializer.schema";
import { CompanySchema } from "../schemas/users";



const companiesRouter = Router()

companiesRouter.post('',YupVerification(CompanySchema),createCompanyController)
companiesRouter.get('',getAllCompanyCController)
companiesRouter.get('/:id',getIdCompanyCController)
companiesRouter.delete(':id',deleteCompanyController)
companiesRouter.patch('/:id' ,companyUpdateController)
companiesRouter.post('/:id/veiculos/:idCompany' ,addCompanyToVeiculoController)

export default companiesRouter;
