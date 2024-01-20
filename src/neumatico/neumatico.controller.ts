import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NeumaticoService } from './neumatico.service';
import { CreateNeumaticoDto } from './dto/create-neumatico.dto';
import { UpdateNeumaticoDto } from './dto/update-neumatico.dto';

@Controller('neumatico')
export class NeumaticoController {
  constructor(private readonly neumaticoService: NeumaticoService) {}

  @Post('create')
  create(@Body() createNeumaticoDto: CreateNeumaticoDto) {
    return this.neumaticoService.createNeumatico(createNeumaticoDto);
  }

  @Get()
  findAllneumaticos() {
    return this.neumaticoService.findAllneumaticos();
  }
  @Get('stock')
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
