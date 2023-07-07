import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm"
import { Veiculos } from "./cars.entities"
import { Companies } from "./companies.entities"

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column()
  cpf: string

  @Column({ select: false })
  password: string

  @ManyToOne(() => Companies, (company) => company.users, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  companies: Companies | null

  @OneToMany(() => Veiculos, (veiculo) => veiculo.users, {
    onDelete: "CASCADE",
  })
  @JoinColumn()
  veiculos: Veiculos[]
}
export { User }
