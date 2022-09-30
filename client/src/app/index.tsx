import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { NavBar } from '../components'
import { MoviesInsert, MoviesList, MoviesUpdate } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/movies/list" element={<MoviesList />} />
                <Route path="/movies/create" element={<MoviesInsert />} />
                <Route path="/movies/update/:id" element={<MoviesUpdate />} />
            </Routes>
        </Router>
    )
}

export default App
