import { ObjectId, WithId, Document } from 'mongodb'

export default interface Movie extends WithId<Document> {
    name: string
    time: string[]
    rating: number
    id?: ObjectId
}
