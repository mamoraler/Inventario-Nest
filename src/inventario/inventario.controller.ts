import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { CreateInventarioDto } from './dto/create-inventario.dto';
import { UpdateInventarioDto } from './dto/update-inventario.dto';
import { Auth } from 'src/user/decorators/auth.decorator';
import { ValidRoles } from 'src/user/interfaces/valid-roles.interface';
import { GetUser } from 'src/user/decorators/get-user.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('inventario')
export class InventarioController {
  constructor(private readonly inventarioService: InventarioService) {}

  @Post('create')
  @Auth(ValidRoles.ingMatPrimas)
  createMatPrima(
    @GetUser() user: User,
    @Body() createInventarioDto: CreateInventarioDto) {
    return this.inventarioService.createMatPrima(createInventarioDto, user);
  }

  @Get()
  @Auth(ValidRoles.cons)
  findAllInventario(
  @GetUser() user: User,  
  ) {
    return this.inventarioService.findAllInventario();
  }

  @Get('stock')
  @Auth(ValidRoles.cons)
  findStock(){
  return this.inventarioService.findStock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventarioService.findOne(+id);
  }

  @Patch(':id')
  @Auth(ValidRoles.ingMatPrimas)
  update(@Param('id') id: string, @Body() updateInventarioDto: UpdateInventarioDto) {
    return this.inventarioService.updateMatPrima(id, updateInventarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventarioService.remove(+id);
  }
}
