import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import jwt from "jsonwebtoken";



export const verifyTokenValidationMiddleware = async (req: Request,res: Response,next: NextFunction) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(" ")[1];

  if (!token) throw new AppError("Missing token.", 401);

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    async (error, decoded) => {
      if (error) res.json(error.message);

      req.user = decoded;

      next();
    }
    
  );
};