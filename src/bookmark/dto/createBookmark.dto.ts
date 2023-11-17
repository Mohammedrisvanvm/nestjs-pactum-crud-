import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class createBookmarkDto {
  @IsString()
  @IsNotEmpty()
  title: String;

  @IsString()
  @IsOptional()
  description?: String;
  
  @IsString()
  @IsNotEmpty()
  link: String;
}
