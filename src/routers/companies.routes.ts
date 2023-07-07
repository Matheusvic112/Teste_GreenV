import { Router } from "express"
import {
  addCompanyToVeiculoController,
  companyUpdateController,
  createCompanyController,
  deleteCompanyController,
  getAllCompanyCController,
  getIdCompanyCController,
  removeUsersCompanyController,
  removeVehicleCompanyController,
} from "../controller/Companies.controllers"
import { emailAndCnpjMiddleware } from "../middlewares/companies/verifyEmailAndCnpj.middleware"
import { verifyTokenValidationMiddleware } from "../middlewares/login/verifyTokenValidation.middleware"
import { verifyPatchAndDeleteMiddleware } from "../middlewares/user/verifyUpdateAndDelete.middleware"
import { YupVerification } from "../schemas/serializer.schema"
import { CompanyPachtSchema, CompanySchema } from "../schemas/users"

const companiesRouter = Router()

companiesRouter.post(
  "/:createdBy",
  YupVerification(CompanySchema),
  verifyTokenValidationMiddleware,
  createCompanyController
)
companiesRouter.get(
  "",
  verifyTokenValidationMiddleware,
  getAllCompanyCController
)
companiesRouter.get(
  "/:id",
  verifyTokenValidationMiddleware,
  getIdCompanyCController
)
companiesRouter.delete(
  "/:id",
  verifyTokenValidationMiddleware,
  verifyPatchAndDeleteMiddleware,
  deleteCompanyController
)
companiesRouter.delete(
  "/:id/users/:idCompany",
  verifyTokenValidationMiddleware,
  removeUsersCompanyController
)
companiesRouter.delete(
  "/:id/users/:idVehicle",
  verifyTokenValidationMiddleware,
  removeVehicleCompanyController
)
companiesRouter.patch(
  "/:id",
  YupVerification(CompanyPachtSchema),
  verifyTokenValidationMiddleware,
  verifyPatchAndDeleteMiddleware,
  emailAndCnpjMiddleware,
  companyUpdateController
)
companiesRouter.post(
  "/:id/veiculos/:idCompany",
  verifyTokenValidationMiddleware,
  addCompanyToVeiculoController
)

export default companiesRouter
