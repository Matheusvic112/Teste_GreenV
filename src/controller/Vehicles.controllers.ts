import { Request, Response } from "express";
import VehicleService from "../service/Vehicles.service";

export const createVehicleController = async (req: Request, res: Response) => {
  const{id} = req.params
  const companies = await VehicleService.createVehicle( req.body ,id);
  return res.status(201).json(companies);
};

export const getAllVehicleController = async (req: Request,res: Response) => {
  const companies = await VehicleService.getAllvehicle();
  return res.json(companies);
};

export const deleteVehicleController = async(req:Request , res:Response) =>{
  const { id } = req.params;
  await VehicleService.deleteVehicle(id)
  return res.status(204).end()

};

export const VehicleUpdateController = async (req: Request, res: Response) => {
  const {id} = req.params;
  const user = await VehicleService.updateToVehicle(req.body,id);
  return res.status(200).json(user);
};


export const getVehicleIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await VehicleService.getVehicleById(id);
  return res.status(200).json(user);
};

