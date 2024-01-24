import { Inventario } from "src/inventario/entities/inventario.entity";
import { Neumatico } from "src/neumatico/entities/neumatico.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')

export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text',{
        unique: true
    })
    email: string

    @Column('text')
    password: string;

    @Column('text')
    fullName: string

    @Column('bool',{
        default: true
    })
    isActive: boolean

    @Column('text',{
        array: true,
        default: ['cons']
    })
    roles: string[]

    @OneToMany( () => Neumatico, (neumatico) => neumatico.user )
    neumatico: Neumatico[];

    @OneToMany( () => Inventario, (inventario) => inventario.user )
    inventario: Inventario[];    
    
}
