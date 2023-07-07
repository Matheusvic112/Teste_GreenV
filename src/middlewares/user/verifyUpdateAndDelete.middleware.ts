import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"
import { AppDataSource } from "../../data-source"
import { Veiculos } from "../../entities/cars.entities"
import { Companies } from "../../entities/companies.entities"
import { AppError } from "../../errors"

export const verifyPatchAndDeleteMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const companysRepo = AppDataSource.getRepository(Companies)
  const vehicleRepot = AppDataSource.getRepository(Veiculos)

  const authToken = req.headers.authorization
  const token = authToken!.split(" ")[1]

  const { sub } = jwt.decode(token) as JwtPayload

  const findCompany = await companysRepo.findOne({
    where: { id: req.params.id },
  })

  const findVehicle = await vehicleRepot.findOne({
    where: { id: req.params.id },
  })
  if (sub !== findCompany?.createdBy && req.baseUrl.startsWith("/companies")) {
    throw new AppError("permissão negada ", 403)
  }
  if (sub !== findVehicle?.createdBy && req.baseUrl.startsWith("/veiculos")) {
    throw new AppError("permissão negada ", 403)
  }
  return next()
}
