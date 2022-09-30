const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const db = require('./db')
const errorHandler = require('./middlewares/errorHandler')
const movieRouter = require('./routers/movieRouter')
const PORT = 4000

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api', movieRouter)

db.on('error', console.error.bind(console, 'mongoDB connection error:'))

app.use(errorHandler)

app.listen(PORT, () => {
    console.log('app listening on port', PORT)
})
