import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/auth')
export class UsersController {
  constructor(public usersService: UsersService) {}

  @Get('users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(
      body.firstName,
      body.lastName,
      body.phoneNumber,
      body.email,
      body.password,
    );
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('users/:id')
  findUsers(@Param() id: string) {
    const user = this.usersService.findOne(parseInt(id));

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Delete('users/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }

  @Put('users/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }

  @Put('users/change-password/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    console.log(`Changing password for user ${id}`);
    return this.usersService.changePassword(
      parseInt(id),
      changePasswordDto.newPassword,
    );
  }
}
