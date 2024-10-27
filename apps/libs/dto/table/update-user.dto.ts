import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUserDto {
  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  id: number;

  @IsInt()
  @IsNotEmpty()
  @Type(() => Number) // Asegura la transformación a entero
  userId: number;
}
