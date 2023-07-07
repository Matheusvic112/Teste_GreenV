import { NextFunction, Request, Response } from "express"
import * as yup from "yup"
import { AnySchema } from "yup"
import { AppError } from "../errors"

export const YupVerification =
  (serializer: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await serializer.validate(req.body, {
        stripUnknown: true,
        abortEarly: false,
      })
      return next()
    } catch (error: any) {
      if (error instanceof yup.ValidationError) {
        throw new AppError(error.errors, 400)
      }
    }
  }
