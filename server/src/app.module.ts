import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Genre } from './movie/models/genre.model';
import { MovieGenre } from './movie/models/movie-genre.model';
import { Movie } from './movie/models/movie.model';
import { MovieModule } from './movie/movie.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.SEQUELIZE_DB_USERNAME,
      password: process.env.SEQUELIZE_DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [Movie, Genre, MovieGenre],
      autoLoadModels: true,
      synchronize: true,
    }),
    MovieModule,
  ],
})
export class AppModule {}
