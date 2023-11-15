import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{

    signin() {
        return {msg:'iam signin service'};
      }

    signup() {
        return {msg:'iam signup service'};
       }
}