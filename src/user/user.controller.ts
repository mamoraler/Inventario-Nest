import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAllUser() {
    return this.userService.findAllUser();
  }

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto){
    return this.userService.createUser(createUserDto)
  }  

  @Post('login')
  loginUser(@Body() LoginUserDto: LoginUserDto){
    return this.userService.loginUser(LoginUserDto)
  }
}
