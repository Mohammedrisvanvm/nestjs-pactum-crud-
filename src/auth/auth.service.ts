import { Injectable } from "@nestjs/common";
import { User,BookMark } from "@prisma/client";

@Injectable({})
export class AuthService{

    signin() {
        return {msg:'iam signin service'};
      }

    signup() {
        return {msg:'iam signup service'};
       }
}