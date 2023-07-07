
import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { compare } from "bcrypt";
import { AppError } from "../../errors";
import { IUser } from "../../service/User.service";
import { User } from "../../entities/user.entities";

export const verifyLoginMiddleware = async (req: Request,res: Response,next: NextFunction) => {
  const userRepo = AppDataSource.getRepository(User);
  const { email, password }: IUser = req.body;

  const userEmail = (await userRepo.findOne({
    where: { email: email },
    select: ["password", "email"],
  })) as User;

  if (userEmail) {
    const passMatch = await compare(password, userEmail.password);

    if (!passMatch){
      throw new AppError(" Email ou Password incorretos", 403);
    } 
  }

  if (!userEmail){
    throw new AppError(" Email ou Password estão incorretos", 403);
  } 

  return next();
};