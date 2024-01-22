import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategies';

@Module({
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([ User ]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {

        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN')
          }
        }
      } 
    })    
  ],    
  exports: [TypeOrmModule, JwtStrategy,PassportModule, JwtModule]
})
export class UserModule {}
