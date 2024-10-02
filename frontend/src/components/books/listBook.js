import { useEffect, useReducer, useState } from "react"
import { bookReducer, initialState } from "../reducer/bookReducer"
import { deleteBookAPI, getBooksAPI } from "../../services/bookService"
import { useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import { type } from "@testing-library/user-event/dist/type"

export const ListBooks = () => {

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const [state, dispatch] = useReducer(bookReducer, initialState)
    const [edit, setEdit] = useState(null)

    useEffect(() => {
        getBooksAPI(page)
            .then(response => {
                dispatch({
                    type: 'SET_BOOKS',
                    payload: response.data
                })
                setTotalPage(Math.ceil(response.data.count / 8))
            })
            .catch(error => {
                console.error('Une erreur produit lors du chargement ...', error);
            })
    }, [page])

    const handleDelete = (e, id) => {
        e.preventDefault()
        deleteBookAPI(id)
        dispatch({
            type: 'REMOVE_BOOK',
            payload: id
        })
    }

    const handleEdit = (edit) => {
        setEdit(state.books.results.find(book => book.id === edit.id))
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (edit != null) {
            navigate('/admin/add', { state: { edit } })
        }
    }, [edit,navigate])

    const handlePageChange = (newPage) => {
        setPage(newPage)
    }

    return <>
        <h2 className="text-center">Liste des livres</h2>
        <table className="table table-responsive">
            <thead>
                {state.books && Array.isArray(state.books.results) ? (
                    <tr>
                        <th>Titre</th>
                        <th>Auteur</th>
                        <th>Genre</th>
                        <th>Publié</th>
                        <th>Disponibilité</th>
                        <th>Actions</th>
                    </tr>
                ) : (
                    <tr>
                        <td colSpan="6" >Aucun element chargé ...</td>
                    </tr>
                )}
            </thead>
            <tbody>
                {state.books && Array.isArray(state.books.results) && (
                    state.books.results.map((book, index) => (
                        <tr key={index}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.gender}</td>
                            <td>{book.publication_date}</td>
                            <td className={`text-${book.disponibility ? 'info' : 'danger'} mx-2`}> {book.disponibility ? 'Disponible' : 'Indisponible'}</td>
                            <td>
                                <button type="button" className="btn btn-warning mx-1" onClick={() => handleEdit(book)}>Modifier</button>
                                <button type="button" className="btn btn-danger" onClick={(event) => handleDelete(event, book.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
        {state.books && Array.isArray(state.books.results) && (
            <div>
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="btn btn-outline-primary"
                >
                    <i className="bi bi-arrow-left-short"></i>
                </button>
                <span> {page} </span>
                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPage}
                    className="btn btn-primary"
                >
                    <i className="bi bi-arrow-right-short"></i>
                </button>
            </div>
        )}
        <ToastContainer />
    </>

}
