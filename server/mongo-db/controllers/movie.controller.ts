import { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import Movie from '../models/movie.model'
import { collections } from '../services/mongodb.database.service'

export const getMovieById = async (
    req: Request,
    res: Response,
    next: Function
) => {
    try {
        const movie = (await collections.movies?.findOne({
            _id: new ObjectId(req.params.id),
        })) as Movie

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
        const movies = (await collections.movies?.find({}).toArray()) as Movie[]

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

        const movie = await collections.movies?.insertOne(newMovie)
        if (!movie) throw new Error('Failde to create movie')

        return res.status(201).json({
            success: true,
            id: movie.insertedId,
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

        const movie = await collections.movies?.updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: updatedMovie }
        )
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
        const movie = await collections.movies?.deleteOne({
            _id: new ObjectId(req.params.id),
        })

        if (!movie) {
            throw new Error(`Failed to remove movie with id ${req.params.id}`)
        } else if (!movie.deletedCount) {
            throw new Error(`Movie with id ${req.params.id} does not exist`)
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
