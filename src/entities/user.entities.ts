import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany } from "typeorm";
import { Companies } from "./companies.entities";
import { Veiculos } from "./cars.entities";

@Entity("users")
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string ;

  @Column()
  email: string ;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column({select:false})
  password: string;
  
  @ManyToOne(() => Companies, company => company.users, { onDelete: 'CASCADE' })
  @JoinColumn()
  companies: Companies;


  @OneToMany(() => Veiculos, veiculo => veiculo.users, { onDelete: 'CASCADE' })
  @JoinColumn()
  veiculos: Veiculos[];

}
export{User}