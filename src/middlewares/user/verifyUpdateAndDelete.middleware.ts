import {NextFunction , Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { AppError } from "../../errors";
import { AppDataSource } from "../../data-source";
import { Companies } from "../../entities/companies.entities";
import { Veiculos } from "../../entities/cars.entities";

export const verifyPatchAndDeleteMiddleware = async (req: Request,res: Response,next: NextFunction) => {
  const companysRepo = AppDataSource.getRepository(Companies);
  const vehicleRepot = AppDataSource.getRepository(Veiculos);

  const authToken = req.headers.authorization;
  const token = authToken!.split(" ")[1];

  const { sub } = jwt.decode(token) as JwtPayload;
  
  const findCompany = (await companysRepo.findOne({
    where: { id: req.params.id},

  }));

  const findVehicle = (await vehicleRepot.findOne({
    where: { id: req.params.id},

  }) )
  console.log(sub , findVehicle?.createdBy)
  if (sub !== findCompany?.createdBy ) {
    
    throw new AppError("permissão negada", 403);
  }

  if (sub !== findVehicle?.createdBy) {
    
    throw new AppError("permissão negada", 403);
  }
  return next();
};