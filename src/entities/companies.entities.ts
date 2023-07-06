import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user.entities";
import { Veiculos } from "./cars.entities";

@Entity("companies")
class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  cnpj: string;

  @OneToMany(() => Veiculos, veiculos => veiculos.companies, { onDelete: 'CASCADE' })
  veiculo: Veiculos[];

  @OneToMany(() => User, user => user.companies, { onDelete: 'CASCADE' })
  users: User[];
}

export { Companies };