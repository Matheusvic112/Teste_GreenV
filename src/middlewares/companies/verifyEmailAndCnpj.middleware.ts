import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors";
import { Companies } from "../../entities/companies.entities";
import { AppDataSource } from "../../data-source";

export const emailAndCnpjMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { email, cnpj, phone ,name } = req.body;

  const companiesRepository = AppDataSource.getRepository(Companies);

  if (email) {
    const existingEmailCompany = await companiesRepository.findOne({ where: { email } });
    if (existingEmailCompany) {
      throw new AppError("Email já cadastrado", 409);
    }
  }
  if (name) {
    const existingNomeCompany = await companiesRepository.findOne({ where: { name } });
    if (existingNomeCompany) {
      throw new AppError("Nome já cadastrado", 409);
    }
  }
  if (cnpj) {
    const existingCnpjCompany = await companiesRepository.findOne({ where: { cnpj } });
    if (existingCnpjCompany) {
      throw new AppError("CNPJ já cadastrado", 409);
    }
  }
  if (phone) {
    const existingPhoneCompany = await companiesRepository.findOne({ where: { phone } });
    if (existingPhoneCompany) {
      throw new AppError("Telefone já cadastrado", 409);
    }
  }

  return next();
};