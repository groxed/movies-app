import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieDto } from './dto/movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('all')
  async getMovies() {
    const allMovies = await this.movieService.getMovies();
    if (!!!allMovies.length) return { message: 'There are no movies yet' };

    return { data: allMovies };
  }

  @Get(':id')
  async getMovieById(@Param('id') id: string) {
    const movie = await this.movieService.getMovieById(id);
    if (!movie)
      throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);

    return { data: movie };
  }

  @Post()
  async createMovie(@Body() movieDto: MovieDto) {
    const createdMovie = await this.movieService.createMovie(movieDto);

    return {
      message: 'Successfully created movie',
      data: createdMovie,
    };
  }

  @Put(':id')
  async updateMovie(@Param('id') id: string, @Body() movieDto: MovieDto) {
    const updatedMovie = await this.movieService.updateMovie(id, movieDto);
    if (!!!updatedMovie[0])
      throw new HttpException(
        'No movie with such id was found',
        HttpStatus.NOT_FOUND,
      );

    return {
      message: 'Successfully updated movie',
    };
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: string) {
    const deletedMovie = await this.movieService.deleteMovie(id);
    if (!deletedMovie)
      throw new HttpException(
        'No movie with such id was found',
        HttpStatus.NOT_FOUND,
      );

    return {
      message: 'Successfully deleted movie',
    };
  }
}
