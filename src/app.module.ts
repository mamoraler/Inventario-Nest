import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventarioModule } from './inventario/inventario.module';
import { NeumaticoModule } from './neumatico/neumatico.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
  }),
    InventarioModule,
    NeumaticoModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
