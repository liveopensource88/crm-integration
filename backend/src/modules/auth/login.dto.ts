import { IsEmail, IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer'; // Add this import

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Type(() => String)
  password: string;
}
