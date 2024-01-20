import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
