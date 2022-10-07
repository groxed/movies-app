import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { MovieDto } from './dto/movie.dto';
import { Genre } from './models/genre.model';
import { Movie } from './models/movie.model';

@Injectable()
export class MovieService {
  constructor(
    @InjectModel(Movie)
    private movieModel: typeof Movie,
  ) {}

  getMovieById(id: string): Promise<Movie> {
    return this.movieModel.findOne({
      where: {
        id,
      },
      include: [Genre],
    });
  }

  getMovies(): Promise<Movie[]> {
    return this.movieModel.findAll({ include: [Genre] });
  }

  createMovie(newMovie: MovieDto): Promise<Movie> {
    return this.movieModel.create(newMovie);
  }

  updateMovie(
    id: string,
    updatedMovie: MovieDto,
  ): Promise<[affectedCount: number]> {
    return this.movieModel.update(updatedMovie, {
      where: { id },
    });
  }

  deleteMovie(id: string): Promise<number> {
    return this.movieModel.destroy({ where: { id } });
  }
}
