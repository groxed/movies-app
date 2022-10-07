import { DataTypes } from 'sequelize'
import sequelize from '../services/sequelize.database.service'
import { Genre } from './genre.model'
import { Movie } from './movie.model'

type MovieGenre = {
    movieId: number
    genreId: number
}

export const MovieGenre = sequelize.define('MovieGenre', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
})

const movie_data: Movie[] = [
    { name: 'Movie 1', time: ['14:00'], rating: 1.1, genreId: 3 },
    { name: 'Movie 2', time: ['10:00'], rating: 7.8, genreId: 1 },
    { name: 'Movie 3', time: ['12:00'], rating: 2, genreId: 2 },
]

const genre_data: Genre[] = [
    { name: 'Horror' },
    { name: 'Comedy' },
    { name: 'Drama' },
]

const movie_genre_data: MovieGenre[] = [
    { movieId: 1, genreId: 3 },
    { movieId: 2, genreId: 1 },
    { movieId: 3, genreId: 2 },
]

Movie.belongsToMany(Genre, { through: 'MovieGenre' })
Genre.belongsToMany(Movie, { through: 'MovieGenre' })

export const createAndLinkMovieGenres = () => {
    try {
        Movie.bulkCreate(movie_data, { validate: true }).then(() => {
            Genre.bulkCreate(genre_data, { validate: true }).then(() => {
                MovieGenre.bulkCreate(movie_genre_data, {
                    validate: true,
                }).then(async () => {
                    Movie.findAll({
                        include: {
                            model: Genre,
                        },
                    }).then((res) => {
                        console.log(res)
                    })
                })
            })
        })
    } catch (error) {
        console.log(error)
    }
}
