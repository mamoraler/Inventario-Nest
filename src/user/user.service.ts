import { Injectable, InternalServerErrorException, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  private readonly logger = new Logger('AuthService')
  constructor(
      @InjectRepository(User)
      private readonly userRepository: Repository<User>,
  ) {

  }

  async findAllUser() {
   
    try {
      const userAll= await this.userRepository.find({
        select: { email: true, password: false, id: true , fullName:true, isActive:true , roles: true}
      })
      return userAll;
    } catch (error) {
      
      this.handleDBErrors(error)
    }
  }

  async createUser(createUserDto: CreateUserDto) {

    try {
        const { password, ...userData } = createUserDto

        const user = this.userRepository.create({
            ...userData,
            password: bcrypt.hashSync(password, 10)
        })
        await this.userRepository.save(user)
        delete user.password

        return user
            
        
    } catch (error) {
        this.handleDBErrors(error)
    }

}

async loginUser(loginUserDto: LoginUserDto) {

  try {  
    const { password, email } = loginUserDto

    const user = await this.userRepository.findOne({
        where: { email },
        select: { email: true, password: true, id: true }
    })
    
    if (!user)
        throw new UnauthorizedException(`Credentials are not valid (email)`)

    if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException(`Credentials are not valid (password)`)

    delete user.password
    return user

  } catch (error) {
    this.handleDBErrors(error)
  }

}
    

    private handleDBErrors(error: any) {

      this.logger.error(error)

      throw new InternalServerErrorException(`Please check server logs`)
  }

}
