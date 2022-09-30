const Movie = require('../models/movieModel')

getMovieById = async (req, res, next) => {
    try {
        const movie = await Movie.findOne({ _id: req.params.id })

        if (!movie) {
            throw new Error('No movie with such id found')
        }
        return res.status(200).json({ success: true, data: movie })
    } catch (e) {
        next(e)
    }
}

getMovies = async (req, res, next) => {
    try {
        const movies = await Movie.find({})

        if (!!!movies.length) {
            throw new Error('No movies found')
        }
        return res.status(200).json({ success: true, data: movies })
    } catch (e) {
        next(e)
    }
}

createMovie = async (req, res, next) => {
    try {
        const body = req.body

        if (!body) throw new Error('You must provide movie details')

        const movie = await new Movie(body).save()
        return res.status(201).json({
            success: true,
            id: movie._id,
            message: 'Successfully created movie!',
        })
    } catch (e) {
        next(e)
    }
}

updateMovie = async (req, res, next) => {
    try {
        const updatedMovie = req.body

        if (!updatedMovie) throw new Error('You must provide a body to update')

        const movie = await Movie.findOneAndUpdate(
            { _id: req.params.id },
            updatedMovie
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

deleteMovie = async (req, res, next) => {
    try {
        const movie = await Movie.findOneAndDelete({ _id: req.params.id })
        if (!movie) throw new Error('Movie not found')

        return res.status(201).json({
            success: true,
            message: 'Successfully deleted movie!',
            data: movie,
        })
    } catch (e) {
        next(e)
    }
}

module.exports = {
    getMovieById,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
}
