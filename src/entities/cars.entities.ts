import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, ManyToOne } from "typeorm";
import { User } from "./user.entities";
import { Companies } from "./companies.entities";


@Entity("veiculos")
class Veiculos{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length:100})
  brand:string;

  @Column({length:100})
  model: string;

  @Column({length:4})
  year: string;

  @Column({length:20})
  plate:string;
  
  @Column({default:true})
  rented: boolean

  @ManyToOne(() => Companies, companies => companies.veiculos)
  companies: Companies;

  @ManyToMany(() => User, user => user.veiculos)
  @JoinTable({ name: "user_veiculos" })

  
  users: User[];

}
export{Veiculos}