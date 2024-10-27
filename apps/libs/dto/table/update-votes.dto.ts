import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVotesDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  id: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  ojeda: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  castro: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  abasolo: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  blanks: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  nulls: number;
}
