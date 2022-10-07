import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class MovieDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsArray()
  time: string[];

  @IsNotEmpty()
  @IsNumber()
  rating: number;
}
