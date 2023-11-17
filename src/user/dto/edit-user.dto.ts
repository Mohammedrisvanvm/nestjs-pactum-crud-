import {
  IsEmail,
  IsOptional,
  IsString,
} from 'class-validator';

export class editUserDto {
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  firstName?: string;
  @IsString()
  @IsOptional()
  lastName?: string;
}
