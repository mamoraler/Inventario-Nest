import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('cantidades') 
export class Cantidad {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type :'text', nullable:true})
    tipoNeumatico :string;

    @Column({type :'text', nullable:true})
    tipoMatPrima :string;

    @Column({type :'int', default:0})
    cantidad:number;

    @Column({type :'text', nullable:true})
    descripcion:string;    

}