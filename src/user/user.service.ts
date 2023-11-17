import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { editUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(private prima: PrismaService) {}
  async editUser(
    userId: number,
    dto: editUserDto,
  ) {
    const user = await this.prima.user.update({
      where: { id: userId },
      data: { ...dto },
    });
    delete user.password;
    return user;
  }
}
