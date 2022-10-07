import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import { Genre } from './genre.model';
import { MovieGenre } from './movie-genre.model';

@Table({ freezeTableName: true, tableName: 'movies' })
export class Movie extends Model<Movie> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('time').split(';');
    },
    set(timeArr: string[]) {
      this.setDataValue('time', timeArr.join(';'));
    },
  })
  time: string[];

  @Column({
    type: DataType.DOUBLE,
    allowNull: false,
  })
  rating: number;

  @BelongsToMany(() => Genre, () => MovieGenre)
  genres: Genre[];
}
