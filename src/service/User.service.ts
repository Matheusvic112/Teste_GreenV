import { hash } from "bcrypt"
import { AppDataSource } from "../data-source"
import { Veiculos } from "../entities/cars.entities"
import { Companies } from "../entities/companies.entities"
import { User } from "../entities/user.entities"

export interface IUser {
  id: string
  name: string
  email: string
  cpf: string
  phone: string
  password: string
}

class UserService {
  private userRepo = AppDataSource.getRepository(User)
  private companisRepo = AppDataSource.getRepository(Companies)
  private veiculoRepo = AppDataSource.getRepository(Veiculos)

  async createUser(body: IUser) {
    const passCrypt = await hash(body.password, 10)
    const createUser = this.userRepo.create({ ...body, password: passCrypt })
    await this.userRepo.save(createUser)
    const { password, ...userOutPassword } = createUser

    return userOutPassword
  }
  async getAllUsers() {
    const userGetAllUsers = await this.userRepo.find({
      select: ["id", "name", "email", "cpf", "phone"],
      relations: { companies: true, veiculos: true },
    })

    return userGetAllUsers
  }

  async getUserById(userId: string) {
    const userGetById = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["veiculos", "companies"],
    })
    if (!userGetById) {
      throw new Error("Usuário não encontrado")
    }

    const { password, ...userWithoutPassword } = userGetById

    return userWithoutPassword
  }
  async deleteUserById(userId: string) {
    const userDelete = await this.userRepo.findOne({
      where: { id: userId },
      relations: ["veiculos", "companies"],
    })
    if (!userDelete) {
      throw new Error("Usuário não encontrado")
    }
    await this.userRepo.delete(userDelete?.id)
    return userDelete
  }
  async updateUser(body: IUser, userId: string) {
    const userUpdate = (await this.userRepo.findOneBy({ id: userId })) as User
    await this.userRepo.update(userUpdate.id, { ...body })
    const findUser = await this.userRepo.findOneBy({ id: userId })
    return findUser
  }

  async addUserToCompany(userId: string, companyId: string) {
    const userRepository = this.userRepo
    const companiesRepository = this.companisRepo
    const findUser = await userRepository.findOne({
      where: { id: userId },
      relations: ["companies"],
    })

    const company = await companiesRepository.findOne({
      where: { id: companyId },
    })

    if (!findUser) {
      throw new Error("Usuário não encontrado")
    }

    if (!company) {
      throw new Error("Companies não encontrado")
    }

    if (findUser.companies) {
      throw new Error("Usuário já possui uma empresa associada")
    }

    if (findUser.companies !== null && findUser.companies !== undefined) {
      throw new Error("Usuário já possui uma empresa associada")
    }

    findUser.companies = company

    return await userRepository.save(findUser)
  }
  async addUserToVeiculo(userId: string, veiculoId: string) {
    const userRepository = this.userRepo
    const veiculoRepository = this.veiculoRepo

    const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["veiculos"],
    })

    const vehicle = await veiculoRepository.findOne({
      where: { id: veiculoId },
    })

    if (!user) {
      throw new Error("Usuário não encontrado")
    }

    if (!vehicle) {
      throw new Error("Veículo não encontrado")
    }

    if (user.veiculos.length) {
      throw new Error("Usuário já possui um veículo associado")
    }

    user.veiculos = [vehicle]

    const updatedUser = await userRepository.save(user)
    const { password, ...responseUser } = updatedUser

    return responseUser
  }
}

export default new UserService()
