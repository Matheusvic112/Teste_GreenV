import { NextFunction, Request, Response } from "express"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities/user.entities"
import { AppError } from "../../errors"

export const checkExistingDataMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const { email, phone, cpf } = req.body

  const userRepository = AppDataSource.getRepository(User)

  if (email) {
    const existingEmailUser = await userRepository.findOne({ where: { email } })
    if (existingEmailUser && existingEmailUser.id !== id) {
      throw new AppError("Email já cadastrado em outro usuário", 409)
    }
  }

  if (phone) {
    const existingPhoneUser = await userRepository.findOne({ where: { phone } })
    if (existingPhoneUser && existingPhoneUser.id !== id) {
      throw new AppError("Telefone já cadastrado em outro usuário", 409)
    }
  }

  if (cpf) {
    const existingCPFUser = await userRepository.findOne({ where: { cpf } })
    if (existingCPFUser && existingCPFUser.id !== id) {
      throw new AppError("CPF já cadastrado em outro usuário", 409)
    }
  }

  return next()
}
