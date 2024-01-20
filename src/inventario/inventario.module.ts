import { Module } from '@nestjs/common';
import { InventarioService } from './inventario.service';
import { InventarioController } from './inventario.controller';
import { Inventario } from './entities/inventario.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [InventarioController],
  providers: [InventarioService],
  imports: [
    TypeOrmModule.forFeature([ Inventario ])
  ],  
})
export class InventarioModule {}
