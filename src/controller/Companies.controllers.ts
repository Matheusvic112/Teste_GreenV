import { Request, Response } from "express";
import companiesService from "../service/companies.service";

export const createCompanyController = async (req: Request, res: Response) => {
  const company = await companiesService.createCompany( req.body);
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
  const companies = await companiesService.addComapanyToVeiculo(id, idCompany);
  return res.status(201).json(companies);
}