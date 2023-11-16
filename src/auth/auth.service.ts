import { Injectable, Req } from "@nestjs/common";
import { User, BookMark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from 'express';
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) { }

  async signup(dto: AuthDto) {
    //generate password

    const hash = await argon.hash(dto.password)
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hash
      }
    })
    delete user.password
    return user
    return { msg: `iam signup service ${dto}` };
  }
  signin(dto: AuthDto) {

    return { msg: `iam signin service ${dto.email},${dto.password}` };
  }

}