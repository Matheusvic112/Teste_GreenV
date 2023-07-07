import { Request, Response } from "express";
import companiesService from "../service/companies.service";

export const createCompanyController = async (req: Request, res: Response) => {
  const {createdBy} = req.params
  const company = await companiesService.createCompany( req.body, createdBy);
  return res.status(201).json(company);
};

export const getIdCompanyCController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const company = await companiesService.getCompanyById( id);
  return res.status(201).json(company);
};
export const getAllCompanyCController = async (req: Request,res: Response) => {
  const company = await companiesService.getAllCompanies();
  return res.json(company);
};

export const removeUsersCompanyController = async(req:Request , res:Response) =>{
  const { id , idCompany} = req.params;
  await companiesService.removeUserFromCompany(id, idCompany)
  return res.status(204).end()


;};
export const removeVehicleCompanyController = async(req:Request , res:Response) =>{
  const { id , idVehicle} = req.params;
  await companiesService.removeVehicleFromCompany(id, idVehicle)
  return res.status(204).end()

}
export const deleteCompanyController = async(req:Request , res:Response) =>{
  const { id } = req.params;
  await companiesService.deleteCompany(id)
  return res.status(204).end()

};

export const companyUpdateController = async (req: Request, res: Response) => {
  const {id} = req.params;
  const company = await companiesService.updateCompany(req.body,id);
  return res.status(200).json(company);
};

export async function addCompanyToVeiculoController(req: Request, res: Response) {
  const  { id,idCompany}  = req.params;
  const company = await companiesService.addComapanyToVeiculo(id, idCompany);
  return res.status(201).json(company);
}