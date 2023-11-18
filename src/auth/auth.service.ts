import {
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    //generate password

    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          password: hash,
        },
      });
      delete user.password;
      return user;
    } catch (error) {
      //error catching from prisma
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'credentials taken',
          );
        }
      }
      throw error;
    }
  }
  async signin(dto: AuthDto) {
    //find user from db
    const user = await this.prisma.user.findFirst(
      { where: { email: dto.email } },
    );

    if (!user) {
      throw new ForbiddenException(
        'credentials incorrect',
      );
    }
    //check password using argon
    const pwMatches = await argon.verify(
      user.password,
      dto.password,
    );

    //if doesn't match throw error
    if (!pwMatches) {
      throw new ForbiddenException(
        'credentials incorrect',
      );
    }

    return this.signToken(user.id, user.email);
  }

  async signToken(
    userId: number,
    email: string,
  ): Promise<{ access_Token: string }> {
    const payload = {
      sub: userId,
      email,
    };

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      },
    );
    return { access_Token: token };
  }
}
