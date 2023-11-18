import {
  Controller,
  Get,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from './../auth/decorator/get-user.decorator';
import { jwtGuard } from './../auth/guard/jwt.guard';
import { editUserDto } from './dto/intex';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // GET /users/me
  @UseGuards(jwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  // PATCH /users/edit
  @Patch('edit')
  @UseGuards(jwtGuard)
  editUser(
    @GetUser() user: User,
    @Body() dto: editUserDto,
  ) {
    return this.userService.editUser(
      user.id,
      dto,
    );
  }
}
