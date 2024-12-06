import { IsEmail, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(10)
  password: string;

  @MinLength(3)
  username: string;
}
