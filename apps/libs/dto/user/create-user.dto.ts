import { Type } from 'class-transformer';
import { IsEmail, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  id: number;


  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsOptional()
  phone: string;
  
  @IsString()
  @IsNotEmpty()
  name: string;


  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  password: string;

  @IsString()
  role?: string;
}
