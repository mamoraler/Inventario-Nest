import { Module } from '@nestjs/common';
import { NeumaticoService } from './neumatico.service';
import { NeumaticoController } from './neumatico.controller';
import { Neumatico } from './entities/neumatico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { Cantidad } from './entities/cantidad.entity';
import { InventarioModule } from 'src/inventario/inventario.module';

@Module({
  controllers: [NeumaticoController],
  providers: [NeumaticoService],
  imports: [
    InventarioModule,
    TypeOrmModule.forFeature([ Neumatico,Cantidad]),
    UserModule,
  ],     
})  
export class NeumaticoModule {}
 