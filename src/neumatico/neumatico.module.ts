import { Module } from '@nestjs/common';
import { NeumaticoService } from './neumatico.service';
import { NeumaticoController } from './neumatico.controller';
import { Neumatico } from './entities/neumatico.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [NeumaticoController],
  providers: [NeumaticoService],
  imports: [
    TypeOrmModule.forFeature([ Neumatico ]),
    UserModule,
  ],     
})  
export class NeumaticoModule {}
