import { IsString, IsEmail, MinLength } from 'class-validator';

export class LogInHttpDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
