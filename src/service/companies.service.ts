import { AppDataSource } from "../data-source"
import { Veiculos } from "../entities/cars.entities"
import { Companies } from "../entities/companies.entities"
import { User } from "../entities/user.entities"

interface ICompanies {
  id?: string
  name: string
  email: string
  phone: string
  createdBy: string
}

class CompaniesService {
  private companiesRepo = AppDataSource.getRepository(Companies)
  private veiculoRepo = AppDataSource.getRepository(Veiculos)
  private userRepo = AppDataSource.getRepository(User)
  async createCompany(body: ICompanies, createdBy: string) {
    const companyCreate = this.companiesRepo.create({ ...body, createdBy })
    await this.companiesRepo.save(companyCreate)

    return companyCreate
  }

  async getAllCompanies() {
    const companyGetAll = await this.companiesRepo.find()
    return companyGetAll
  }
  async deleteCompany(companyId: string) {
    const companyDelete = await this.companiesRepo.findOne({
      where: { id: companyId },
    })
    if (!companyDelete) {
      return "Error"
    }
    return await this.companiesRepo.delete(companyDelete.id)
  }
  async getCompanyById(companieId: string) {
    const companyGetId = await this.companiesRepo.findOne({
      where: { id: companieId },
      relations: ["users", "veiculo"],
    })

    if (!companyGetId) {
      throw new Error("Empresa não encontrada")
    }

    return companyGetId
  }

  async updateCompany(body: ICompanies, companieId: string) {
    const CompanyToUpdate = await this.companiesRepo.findOneBy({
      id: companieId,
    })
    if (!CompanyToUpdate) {
      throw new Error("Empresa não encontrada")
    }
    const updateCompany = Object.assign(CompanyToUpdate, body)

    await this.companiesRepo.save(updateCompany)

    return updateCompany
  }
  async addComapanyToVeiculo(companyId: string, veiculoId: string) {
    const companyRepository = this.companiesRepo
    const veiculoRepository = this.veiculoRepo
    const company = await companyRepository.findOne({
      where: { id: companyId },
      relations: ["users"],
    })
    const vehicle = await veiculoRepository.findOne({
      where: { id: veiculoId },
      relations: ["companies"],
    })

    if (!company) {
      throw new Error("Empresa não encontrada")
    }

    if (!vehicle) {
      throw new Error("Veículo não encontrado")
    }

    if (company.veiculo) {
      throw new Error("A empresa já possui um veículo associado")
    }

    vehicle.companies = company

    await veiculoRepository.save(vehicle)

    return vehicle
  }
  async removeUserFromCompany(userId: string, companyId: string) {
    const companyRepository = this.companiesRepo
    const userRepository = this.userRepo

    const company = await companyRepository.findOne({
      where: { id: companyId },
      relations: ["users"],
    })

    if (!company) {
      throw new Error("Empresa não encontrada")
    }
    const user = company.users.find((user) => user.id === userId)

    if (!user) {
      throw new Error("Usuário não encontrado na empresa")
    }

    user.companies = null
    await userRepository.save(user)

    return
  }
  async removeVehicleFromCompany(userId: string, vehicleId: string) {
    const companyRepository = this.companiesRepo
    const vehicleRepository = this.veiculoRepo

    const company = await companyRepository.findOne({
      where: { id: vehicleId },
      relations: ["veiculo"],
    })

    if (!company) {
      throw new Error("Empresa não encontrada")
    }

    const vehicle = company.veiculo.find((vehicle) => vehicle.id === userId)

    if (!vehicle) {
      throw new Error("Veículo não encontrado na empresa")
    }

    vehicle.companies = null
    await vehicleRepository.save(vehicle)

    return
  }
}
export default new CompaniesService()
