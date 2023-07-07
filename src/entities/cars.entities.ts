import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinColumn, JoinTable, ManyToOne, OneToOne, OneToMany } from "typeorm";
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
  
  @Column()
  createdBy:string
  

  @ManyToOne(() => Companies, companies => companies.veiculo ,  { onDelete: 'CASCADE' })
  @JoinColumn({name:"companies_name"})
  companies: Companies | null;

  @ManyToOne(() => User, user => user.veiculos,  { onDelete: 'CASCADE' })
  @JoinColumn()
  users: User;


 
}
export{Veiculos}

