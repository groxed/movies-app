import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Genre } from './genre.model';
import { Movie } from './movie.model';

@Table
export class MovieGenre extends Model<MovieGenre> {
  @ForeignKey(() => Movie)
  @Column
  movieId: number;

  @ForeignKey(() => Genre)
  @Column
  genreId: number;
}
