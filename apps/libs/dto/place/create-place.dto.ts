import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, MaxLength, IsOptional, IsInt } from 'class-validator';

export class CreatePlaceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional() // Hace que el campo sea opcional
  @MaxLength(255)
  address?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number) // Asegura la transformación a entero
  userId?: number;


}
