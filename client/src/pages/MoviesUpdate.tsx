import { useEffect, useState } from 'react'
import api from '../api'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

const Title = styled.h1.attrs({
    className: 'h1',
})``
const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`
const Label = styled.label`
    margin: 5px;
`
const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`
const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`
const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

const MoviesUpdate = () => {
    const [state, setState] = useState({
        id: useParams().id,
        name: '',
        rating: '',
        time: '',
    })

    const handleChangeInputName = (event: any) => {
        const name = event.target.value
        setState({ ...state, name })
    }

    const handleChangeInputRating = (event: any) => {
        const rating = event.target.validity.valid
            ? event.target.value
            : state.rating

        setState({ ...state, rating })
    }

    const handleChangeInputTime = (event: any) => {
        const time = event.target.value
        setState({ ...state, time })
    }

    const handleUpdateMovie = async () => {
        const { id, name, rating, time } = state
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        if (id)
            await api.updateMovieById(id, payload).then(() => {
                window.alert(`Movie updated successfully`)
                setState({ ...state, name: '', rating: '', time: '' })
            })
    }
    useEffect(() => {
        const { id } = state

        const getMovie = async () => {
            if (id)
                await api.getMovieById(id).then((res) => {
                    setState({
                        ...state,
                        name: res.data.data.name,
                        rating: res.data.data.rating,
                        time: res.data.data.time.join('/'),
                    })
                })
        }
        getMovie()
        //eslint-disable-next-line
    }, [])

    return (
        <Wrapper>
            <Title>Create Movie</Title>

            <Label>Name: </Label>
            <InputText
                type="text"
                value={state.name}
                onChange={handleChangeInputName}
            />

            <Label>Rating: </Label>
            <InputText
                type="number"
                step="0.1"
                lang="en-US"
                min="0"
                max="10"
                pattern="[0-9]+([,\.][0-9]+)?"
                value={state.rating}
                onChange={handleChangeInputRating}
            />

            <Label>Time: </Label>
            <InputText
                type="text"
                value={state.time}
                onChange={handleChangeInputTime}
            />

            <Button onClick={handleUpdateMovie}>Update Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default MoviesUpdate
