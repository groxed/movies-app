import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieController } from './movie.controller';
import { Movie } from './models/movie.model';
import { MovieService } from './movie.service';

@Module({
  imports: [SequelizeModule.forFeature([Movie])],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
