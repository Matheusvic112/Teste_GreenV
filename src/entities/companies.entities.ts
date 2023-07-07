import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Veiculos } from "./cars.entities"
import { User } from "./user.entities"

@Entity("companies")
class Companies {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  cnpj: string

  @Column()
  createdBy: string

  @OneToMany(() => Veiculos, (veiculos) => veiculos.companies, {
    onDelete: "CASCADE",
  })
  veiculo: Veiculos[]

  @OneToMany(() => User, (user) => user.companies, { onDelete: "CASCADE" })
  users: User[]
}

export { Companies }
