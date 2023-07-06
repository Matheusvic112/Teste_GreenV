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

//44e0f24e-f4c2-4773-ba30-522ce9afc07b
//569d161a-c09c-4aec-a6a4-0f174af6b7db
}
export{User}