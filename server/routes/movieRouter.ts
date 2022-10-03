import express from 'express'
import {
    getMovieById,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
} from '../controllers/movieController'

const moviesRouter = express.Router()

moviesRouter.use(express.json())

moviesRouter.get('/movie/:id', getMovieById)
moviesRouter.get('/movies', getMovies)
moviesRouter.post('/movie', createMovie)
moviesRouter.put('/movie/:id', updateMovie)
moviesRouter.delete('/movie/:id', deleteMovie)

export default moviesRouter
