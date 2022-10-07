import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { MovieGenre } from './movie-genre.model';
import { Movie } from './movie.model';

@Table({ freezeTableName: true, tableName: 'genres' })
export class Genre extends Model<Genre> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Movie, () => MovieGenre)
  movies: Movie[];
}
