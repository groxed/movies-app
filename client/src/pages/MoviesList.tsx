import { useEffect, useState } from 'react'
import api from '../api'
import styled from 'styled-components'
import ReactTable from 'react-table-6'
import 'react-table-6/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`
const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`
type MovieActionProps = {
    id: string
}
const UpdateMovie = ({ id }: MovieActionProps) => {
    const updateUser = (event: any) => {
        event.preventDefault()

        window.location.href = `/movies/update/${id}`
    }

    return <Update onClick={updateUser}>Update</Update>
}

const DeleteMovie = ({ id }: MovieActionProps) => {
    const deleteUser = async (event: any) => {
        event.preventDefault()

        if (
            window.confirm(`Do tou want to delete the movie ${id} permanently?`)
        ) {
            await api.deleteMovieById(id).then(() => window.location.reload())
        }
    }

    return <Delete onClick={deleteUser}>Delete</Delete>
}

const MoviesList = () => {
    const [state, setState] = useState({
        movies: [],
        isLoading: false,
    })

    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            filterable: true,
        },
        {
            Header: 'Name',
            accessor: 'name',
            filterable: true,
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            filterable: true,
        },
        {
            Header: 'Time',
            accessor: 'time',
            Cell: (props: any) => <span>{props.value.join(' / ')}</span>,
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props: any) {
                return (
                    <span>
                        <DeleteMovie id={props.original.id} />
                    </span>
                )
            },
        },
        {
            Header: '',
            accessor: '',
            Cell: function (props: any) {
                return (
                    <span>
                        <UpdateMovie id={props.original.id} />
                    </span>
                )
            },
        },
    ]

    const getMovies = async () => {
        await api.getAllMovies().then((res) => {
            setState({ ...state, movies: res.data.data, isLoading: false })
        })
    }

    useEffect(() => {
        setState({ ...state, isLoading: true })
        getMovies()
        //eslint-disable-next-line
    }, [])

    let showTable = true
    if (!!!state.movies.length) {
        showTable = false
    }

    return (
        <Wrapper>
            {showTable && (
                <ReactTable
                    data={state.movies}
                    columns={columns}
                    loading={state.isLoading}
                    defaultPageSize={10}
                    showPageSizeOptions={true}
                    minRows={0}
                />
            )}
        </Wrapper>
    )
}

export default MoviesList
