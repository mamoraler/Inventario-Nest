import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NeumaticoService } from './neumatico.service';
import { CreateNeumaticoDto } from './dto/create-neumatico.dto';
import { UpdateNeumaticoDto } from './dto/update-neumatico.dto';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ValidRoles } from 'src/user/interfaces/valid-roles.interface';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('neumatico')
export class NeumaticoController {
  constructor(private readonly neumaticoService: NeumaticoService) {}

  @Post('create')
  @Auth(ValidRoles.crearNeumaticos)
  create(
    @GetUser() user: User,
    @Body() createNeumaticoDto: CreateNeumaticoDto) {
    return this.neumaticoService.createNeumatico(createNeumaticoDto, user);
  }

  @Get()
  @Auth(ValidRoles.cons)
  findAllneumaticos() {
    return this.neumaticoService.findAllneumaticos();
  }
  @Get('stock')
  @Auth(ValidRoles.cons)
  findStock(){
  return this.neumaticoService.findStock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.neumaticoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNeumaticoDto: UpdateNeumaticoDto) {
    return this.neumaticoService.update(+id, updateNeumaticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.neumaticoService.remove(+id);
  }
}
