import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateNeumaticoDto {


@IsString()
@IsIn(['Moto','Auto','Camion','tractor'])
tipoNeumatico :string;

@IsNumber()
@IsPositive()
cantidad:number;
 
@IsString()
@IsOptional()
descripcion?:string;
}