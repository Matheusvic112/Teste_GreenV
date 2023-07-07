import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entities"
import { AppError } from "../../errors"

export const verifyTokenValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers

  const userRepo = AppDataSource.getRepository(User)

  const token = authorization && authorization.split(" ")[1]

  if (!token) throw new AppError("Missing token.", 401)

  return jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    async (error, decoded: any) => {
      if (error) {
        throw new AppError("Invalid token", 401)
      }
      const id = String(decoded.sub)
      const clientFound = await userRepo.findOneBy({ id })

      if (!clientFound) {
        throw new AppError("User Not Found", 404)
      }
      return next()
    }
  )
}
