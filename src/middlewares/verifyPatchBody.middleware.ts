import { NextFunction, Request, Response } from "express"
import { AppError } from "../errors"

export const verifyPatchBodyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verifyKeys = Object.keys(req.body)

  if (verifyKeys.includes("id") || verifyKeys.includes("createdBy")) {
    throw new AppError("Estes dados não podem ser modificados", 401)
  }
  return next()
}
