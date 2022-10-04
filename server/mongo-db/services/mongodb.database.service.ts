import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'

export const collections: { movies?: mongoDB.Collection } = {}

export async function connectToDatabase() {
    dotenv.config()

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(
        process.env.DB_URL!
    )

    await client.connect()

    const db: mongoDB.Db = client.db(process.env.DB_NAME)

    const moviesCollection: mongoDB.Collection = db.collection(
        process.env.MOVIES_COLLECTION_NAME!
    )

    collections.movies = moviesCollection

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${moviesCollection.collectionName}`
    )
}
