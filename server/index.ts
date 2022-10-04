import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import sequelize from './sequelize-db/services/sequelize.database.service'
import moviesRouter from './routes/movie.router'
import errorHandler from './middlewares/errorHandler'
import { createAndLinkMovieGenres } from './sequelize-db/models/movieGenre.model'

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', moviesRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`)
})
app.use(errorHandler)

sequelize
    .authenticate()
    .then(() => {
        sequelize
            .sync({ force: true })
            .then(() => {
                console.log('Connected to database!')

                // to create and populate movies and genres tables
                createAndLinkMovieGenres()
            })
            .catch((error: Error) => {
                console.error('Database connection failed', error)
                process.exit()
            })
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error)
        process.exit()
    })
