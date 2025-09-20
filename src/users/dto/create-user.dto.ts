import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty() // Cannot be empty
  @IsString()   // Must be a string
  @IsEmail()    // Must be a valid email format
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}