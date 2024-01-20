import { IsIn, IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreateInventarioDto {

    @IsString()
    @IsIn(['caucho','alambre','colorante'])
    materiaPrima :string;
    
    @IsNumber()
    @IsPositive()
    cantidad:number;
     
    @IsString()
    @IsOptional()
    descripcion?:string;
    //createAt:Date;    

}
