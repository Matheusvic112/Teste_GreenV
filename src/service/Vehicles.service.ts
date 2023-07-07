import { AppDataSource } from "../data-source"
import { Veiculos } from "../entities/cars.entities"
import { User } from "../entities/user.entities"

interface IVeiculos {
  brand: string
  model: string
  year: string
  plate: string
  rented: boolean
  idVeiculo: string
  createdBy: string
}

class VehicleService {
  private veiculosRepo = AppDataSource.getRepository(Veiculos)
  private userRepo = AppDataSource.getRepository(User)

  async createVehicle(body: IVeiculos, createdBy: string) {
    const vehicleCreate = this.veiculosRepo.create({ ...body, createdBy })
    await this.veiculosRepo.save(vehicleCreate)

    return vehicleCreate
  }
  async getAllvehicle() {
    const vehicleGetAll = await this.veiculosRepo.find()
    return vehicleGetAll
  }
  async deleteVehicle(companyId: string) {
    const vehicleDelete = await this.veiculosRepo.findOne({
      where: { id: companyId },
    })
    if (!vehicleDelete) {
      throw new Error("Veiculo não encontrado")
    }
    return await this.veiculosRepo.delete(vehicleDelete.id)
  }
  async getVehicleById(vehicleId: string) {
    const vehicleGetId = await this.veiculosRepo.findOne({
      where: { id: vehicleId },
      relations: ["users", "companies"],
    })
    if (!vehicleGetId) {
      throw new Error("Veiculo não encontrado")
    }

    return vehicleGetId
  }
  async updateToVehicle(body: IVeiculos, veiculoId: string) {
    const VehicleToUpdate = await this.veiculosRepo.findOneBy({ id: veiculoId })
    if (!VehicleToUpdate) {
      throw new Error("Veiculo não encontrado")
    }
    const updateVehicle = Object.assign(VehicleToUpdate, body)
    if (VehicleToUpdate.createdBy) await this.veiculosRepo.save(updateVehicle)

    return updateVehicle
  }
  async removeVehicleFromCompany(userId: string, vehicleId: string) {
    const vehicleRepository = this.userRepo

    const vehicle = await vehicleRepository.findOne({
      where: { id: vehicleId },
      relations: ["users"],
    })

    if (!vehicle) {
      throw new Error("Veículo não encontrado")
    }
  }
}

export default new VehicleService()
