import { Controller, Get,UseGuards,Req, Patch } from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport'
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from 'src/auth/decorator/get-user.decorator';

@Controller('users')
export class UserController {
    // GET /users/me
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@GetUser() user:User) {
        
        return user
    }
     // PATCH /users/edit

     @Patch()
     editUser(){
        
     }
}
