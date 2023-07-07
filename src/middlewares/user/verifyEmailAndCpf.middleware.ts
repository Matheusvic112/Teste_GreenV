import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entities"
import { AppError } from "../../errors"

export const emailAndCpfMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, cpf, phone } = req.body

  const userRepository = AppDataSource.getRepository(User)

  const existingEmailUser = await userRepository.findOne({ where: { email } })
  const existingCpfUser = await userRepository.findOne({ where: { cpf } })
  const existingPhoneUser = await userRepository.findOne({ where: { phone } })

  if (existingEmailUser) {
    throw new AppError("Email já cadastrado em um usuário existente", 409)
  }

  if (existingCpfUser) {
    throw new AppError("CPF já cadastrado em um usuário existente", 409)
  }

  if (existingPhoneUser) {
    throw new AppError("Telefone já cadastrado em um usuário existente", 409)
  }

  return next()
}
