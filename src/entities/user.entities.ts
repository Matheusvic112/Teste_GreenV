import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany } from "typeorm";
import { Companies } from "./companies.entities";
import { Veiculos } from "./cars.entities";

@Entity("users")
class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column({nullable: false })
  name: string ;

  @Column({unique:true})
  email: string ;

  @Column({unique:true ,nullable:false})
  phone: string;

  @Column({unique:true ,nullable:false})
  cpf: string;

  @Column({ nullable: false })
  password: string;
  
  @ManyToOne(() => Companies, company => company.users)
  @JoinColumn({ name: "companies_id" })
  companies: Companies;

  @ManyToMany(() => Veiculos, veiculos => veiculos.users)
  veiculos: Veiculos[];

}
export{User}