import { Injectable } from "@nestjs/common";
import { User,BookMark } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable({})
export class AuthService{
    constructor(private prisma:PrismaService){}

    signin() {
        return {msg:'iam signin service'};
      }

    signup() {
        return {msg:'iam signup service'};
       }
}