import { Controller, Post,Req ,Body} from '@nestjs/common';
import { AuthService } from './auth.service';

import { Request } from 'express';
import { AuthDto } from './dto/auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Req() req:Request) {

    
   return this.authService.signup(req)
  }

  @Post('signin')
  signin(@Body() dto:AuthDto) {
    console.log(dto);
    
    return this.authService.signin()
  }
}
