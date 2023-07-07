import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entities";
import jwt, { JwtPayload } from "jsonwebtoken";

import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export const verifyIdMiddleware = async (req: Request,res: Response,next: NextFunction) => {
  const companysRepo = AppDataSource.getRepository(User);

  const authToken = req.headers.authorization;
  const token = authToken!.split(" ")[1];

  const { sub } = jwt.decode(token) as JwtPayload;
  
  const findCompany = (await companysRepo.findOne({
    where: { id: req.params.id},

  }));

  if (sub !== findCompany?.id ) {
    
    throw new AppError("permissão negada", 403);
  }


  return next();
};