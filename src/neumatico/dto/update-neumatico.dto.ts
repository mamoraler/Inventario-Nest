import { PartialType } from '@nestjs/mapped-types';
import { CreateNeumaticoDto } from './create-neumatico.dto';

export class UpdateNeumaticoDto extends PartialType(CreateNeumaticoDto) {}
