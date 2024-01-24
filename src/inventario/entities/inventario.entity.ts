import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('Inventario-MatPrimas') 
export class Inventario {

@PrimaryGeneratedColumn('uuid')
id: string;

@Column({type :'text'})
materiaPrima :string;

@Column({type :'int', default:0})
cantidad:number;
 
@Column({type :'text', nullable:true})
descripcion:string;
 
@Column({type:'timestamp',default : "now()"})
createAt:Date;

@Column({type:'timestamp',default : null})
updatedAt: Date;

@ManyToOne(
    () => User,
    user => user.inventario,
    { eager: true }
)
user: User
}
