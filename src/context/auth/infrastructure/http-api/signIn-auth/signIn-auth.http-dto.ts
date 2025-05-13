import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class SignInHttpDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
