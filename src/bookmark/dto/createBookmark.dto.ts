import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookmarkDto {
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
