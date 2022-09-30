const mongoose = require('mongoose')

const DB_URL = 'mongodb://127.0.0.1:27017/cinema'

mongoose
    .connect(DB_URL, { useNewUrlParser: true })
    .catch((e) => console.log('an error has occurred: ', e))

const db = mongoose.connection

module.exports = db
