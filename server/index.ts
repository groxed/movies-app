import express from 'express'
import * as bodyParser from 'body-parser'
import cors from 'cors'
import * as dotenv from 'dotenv'
import { connectToDatabase } from './services/database.service'
import moviesRouter from './routes/movieRouter'
import errorHandler from './middlewares/errorHandler'

dotenv.config()

const app = express()

connectToDatabase()
    .then(() => {
        app.use(cors())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(bodyParser.json())

        app.use('/api', moviesRouter)

        app.listen(process.env.PORT, () => {
            console.log(
                `Server started at http://localhost:${process.env.PORT}`
            )
        })
        app.use(errorHandler)
    })
    .catch((error: Error) => {
        console.error('Database connection failed', error)
        process.exit()
    })
