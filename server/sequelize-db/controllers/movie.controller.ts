import { Movie } from '../models/movie.model'
import { Request, Response } from 'express'
import { Genre } from '../models/genre.model'

export const getMovieById = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const movie = await Movie.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Genre,
            },
        })

        if (!movie) {
            throw new Error('No movie with such id found')
        }
        return res.status(200).json({ success: true, data: movie })
    } catch (e) {
        next(e)
    }
}

export const getMovies = async (
    _req: Request,
    res: Response,
    next: Function
) => {
    try {
        const movies = await Movie.findAll({
            include: {
                model: Genre,
            },
        })

        if (!!!movies.length) {
            throw new Error('No movies found')
        }
        return res.status(200).json({ success: true, data: movies })
    } catch (e) {
        next(e)
    }
}

export const createMovie = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const newMovie: Movie = req.body as Movie

        if (!newMovie) throw new Error('You must provide movie details')

        const movie = await Movie.create(newMovie, {
            include: Genre,
        })

        if (!movie) throw new Error('Failde to create movie')

        return res.status(201).json({
            success: true,
            movie: movie,
            message: 'Successfully created movie!',
        })
    } catch (e) {
        next(e)
    }
}

export const updateMovie = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const updatedMovie: Movie = req.body as Movie

        if (!updatedMovie) throw new Error('You must provide a body to update')

        const movie = await Movie.update(updatedMovie, {
            where: { id: req.params.id },
        })

        if (!movie) throw new Error('Movie not found')

        return res.status(201).json({
            success: true,
            message: 'Successfully updated movie!',
        })
    } catch (e) {
        next(e)
    }
}

export const deleteMovie = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const movie = await Movie.destroy({ where: { id: req.params.id } })

        if (!movie) {
            throw new Error(`Failed to remove movie with id ${req.params.id}`)
        }

        return res.status(201).json({
            success: true,
            message: 'Successfully deleted movie!',
            data: movie,
        })
    } catch (e) {
        next(e)
    }
}
