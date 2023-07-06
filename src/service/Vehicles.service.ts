import { AppDataSource } from "../data-source";
import { Veiculos } from "../entities/cars.entities";
import { User } from "../entities/user.entities";

interface IVeiculos{
  brand:string;
  model: string;
  year: string;
  plate:string;
  rented: boolean
}

class VehicleService{
  private veiculosRepo = AppDataSource.getRepository(Veiculos);
  async createVehicle(body: IVeiculos) {
    
    const vehicleCreate = this.veiculosRepo.create({ ...body });

    await this.veiculosRepo.save(vehicleCreate);
  
  
    return vehicleCreate;
  }
async getAllvehicle() {
  const vehicleGetAll = await this.veiculosRepo.find();
  return vehicleGetAll;
}
async deleteVehicle(companyId: string) {
  const vehicleDelete = await this.veiculosRepo.findOne({ where: { id: companyId } });
  if (!vehicleDelete) {
    return 'Error';
  }
  return await this.veiculosRepo.delete(vehicleDelete.id);
}
async getVehicleById(vehicleId: string) {
  const vehicleGetId = await this.veiculosRepo.findOne({
     where:{ id: vehicleId },
    relations: ["users","companies"]
    
  });
  if (!vehicleGetId) {
    return "Veiculo não encontrado";
  }

  return vehicleGetId;
}
async updateToVehicle(body: IVeiculos, veiculoId: string) {
  const VehicleToUpdate = await this.veiculosRepo.findOneBy({id: veiculoId}) ;
  if (!VehicleToUpdate ) {
    throw new Error("Veiculo não encontrado");
  }
await this.veiculosRepo.update(VehicleToUpdate.id, { ...body });
return VehicleToUpdate;
}




}

export default new VehicleService

//http://localhost:3000/veiculos/7f180c65-a087-47e0-8695-b538199b17cd
//7f180c65-a087-47e0-8695-b538199b17cd veiculo
//bfd28af2-5a9c-46a4-b5a7-712f89f4d710 companies