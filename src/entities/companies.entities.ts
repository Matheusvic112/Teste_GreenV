import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn } from "typeorm";
import { User } from "./user.entities";
import { Veiculos } from "./cars.entities";

@Entity("companies")
class Companies {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable: false })
  name: string ;

  @Column({unique:true})
  email: string ;

  @Column({unique:true})
  phone: string;


  @Column({unique:true})
  cnpj: string;
  @OneToMany(() => Veiculos, veiculos => veiculos.companies)
  veiculos: Veiculos[];

  @OneToMany(() => User, user => user.companies)
  users: User[];
}
export{Companies}