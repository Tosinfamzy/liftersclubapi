import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body()
    createUserDto: {
      email: string;
      password: string;
      username: string;
    },
  ) {
    return this.userService.create(createUserDto);
  }

  @Get(':email')
  getUser(@Param('email') email: string) {
    return this.userService.findOne(email);
  }
}
