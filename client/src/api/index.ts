import axios from 'axios'
import { Movie } from '../utils/types'

const api = axios.create({
    baseURL: 'http://localhost:4000',
})

export const insertMovie = (payload: Movie) => api.post(`/movie`, payload)
export const getAllMovies = () => api.get(`/movie/all`)
export const updateMovieById = (id: string, payload: Movie) =>
    api.put(`/movie/${id}`, { ...payload, rating: parseFloat(payload.rating) })
export const deleteMovieById = (id: string) => api.delete(`/movie/${id}`)
export const getMovieById = (id: string) => api.get(`/movie/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis
