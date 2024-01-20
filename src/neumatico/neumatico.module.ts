import { Module } from '@nestjs/common';
import { NeumaticoService } from './neumatico.service';
import { NeumaticoController } from './neumatico.controller';
import { Neumatico } from './entities/neumatico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NeumaticoController],
  providers: [NeumaticoService],
  imports: [
    TypeOrmModule.forFeature([ Neumatico ])
  ],    
})
export class NeumaticoModule {}
