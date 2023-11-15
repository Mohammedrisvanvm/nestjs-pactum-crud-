import { Injectable ,Req} from "@nestjs/common";
import { User,BookMark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";
import { Request } from 'express';

@Injectable({})
export class AuthService{
    constructor(private prisma:PrismaService){}

    signin() {
        return {msg:'iam signin service'};
      }

    signup(@Req() req:Request) {
        console.log(req.body);
        
        return {msg:`iam signup service ${req.body}`};
       }
}