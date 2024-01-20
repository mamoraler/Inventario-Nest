import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('neumaticos') 
export class Neumatico {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type :'text'})
    tipoNeumatico :string;

    @Column({type :'int', default:0})
    cantidad:number;

    @Column({type :'text', nullable:true})
    descripcion:string;    
    
    @Column({type:'timestamp',default : "now()"})
    createAt:Date;

}
