import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToOne(
        () => User,
        user => user.neumatico,
        { eager: true }
    )
    user: User

}
