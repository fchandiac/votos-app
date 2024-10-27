import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class ResetTableDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  id: number;
}
