import { IsNotEmpty } from 'class-validator';

export class GenreDto {
  @IsNotEmpty()
  name: string;
}
