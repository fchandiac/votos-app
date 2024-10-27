import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ByIdDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number) // Agregar transformación aquí
  id: number;
}