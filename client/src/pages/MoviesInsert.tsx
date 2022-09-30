import { useState } from 'react'
import api from '../api'
import styled from 'styled-components'

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

const MoviesInsert = () => {
    const [state, setState] = useState({
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

    const handleIncludeMovie = async () => {
        const { name, rating, time } = state
        const arrayTime = time.split('/')
        const payload = { name, rating, time: arrayTime }

        await api.insertMovie(payload).then((res) => {
            window.alert(`Movie inserted successfully`)
            setState({
                name: '',
                rating: '',
                time: '',
            })
        })
    }

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

            <Button onClick={handleIncludeMovie}>Add Movie</Button>
            <CancelButton href={'/movies/list'}>Cancel</CancelButton>
        </Wrapper>
    )
}

export default MoviesInsert
