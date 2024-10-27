import { IsInt, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTableDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  number: number;

  @IsInt()
  @IsOptional()
  @Type(() => Number) // Asegura la transformación a entero
  userId?: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  placeId: number;
}
