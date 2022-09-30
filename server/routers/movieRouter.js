const express = require('express')
const {
    getMovieById,
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie,
} = require('../controllers/movieController')

const router = express.Router()

router.get('/movie/:id', getMovieById)
router.get('/movies', getMovies)
router.post('/movie', createMovie)
router.put('/movie/:id', updateMovie)
router.delete('/movie/:id', deleteMovie)

module.exports = router
