import { AppDataSource } from "../data-source";
import { Veiculos } from "../entities/cars.entities";
import { Companies } from "../entities/companies.entities";
import { User } from "../entities/user.entities";

interface ICompanies {
  id: string;
  name: string;
  email: string;
  phone: string;
}

 class CompaniesService{
  private companisRepo = AppDataSource.getRepository(Companies);
  private veiculoRepo = AppDataSource.getRepository(Veiculos)
async createCompany(body: ICompanies) {
  const companyCreate = this.companisRepo.create({ ...body });
  await this.companisRepo.save(companyCreate);
  return companyCreate;
}

async getAllCompanies() {
  const companyGetAll = await this.companisRepo.find();
  return companyGetAll;
}
async deleteCompany(companyId: string) {
  const companyDelete = await this.companisRepo.findOne({ where: { id: companyId } });
  if (!companyDelete) {
    return 'Error';
  }
  return await this.companisRepo.delete(companyDelete.id);
}
async getCompanyById(companieId: string) {
  const companyGetId = await this.companisRepo.findOne({
    where: { id: companieId },
    relations: ["users", "veiculo"],
  });
  
  if (!companyGetId) {
    throw new Error("Empresa não encontrada");
  }

  return companyGetId;
}

async updateCompany(body: ICompanies, companieId: string) {
  const CompanyToUpdate = await this.companisRepo.findOneBy({id: companieId} ) ;
  if (!CompanyToUpdate ) {
    throw new Error("Empresa não encontrada");
  }
await this.companisRepo.update(CompanyToUpdate.id, { ...body });
return CompanyToUpdate
}
async addComapanyToVeiculo(companyId: string, veiculoId: string) {
  const companyRepository = this.companisRepo;
  const veiculoRepository = this.veiculoRepo;
  const company = await companyRepository.findOne({ where: { id: companyId }, relations: ["users"] });
  const vehicle = await veiculoRepository.findOne({ where: { id: veiculoId }, relations: ["companies"] });

  if (!company) {
    throw new Error("Empresa não encontrada");
  }

  if (!vehicle) {
    throw new Error("Veículo não encontrado");
  }

  vehicle.companies = company;

  await veiculoRepository.save(vehicle);

  return vehicle;
}

}
export default new CompaniesService;