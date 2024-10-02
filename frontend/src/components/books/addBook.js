import { useEffect, useReducer, useState } from "react"
import { postBookAPI, putBookAPI } from "../../services/bookService"
import { bookReducer, initialState } from "../reducer/bookReducer"
import { type } from "@testing-library/user-event/dist/type"
import { useLocation, useNavigate } from "react-router-dom" 

export const AddBook = () => {
    const [state, dispatch] = useReducer(bookReducer, initialState)
    const [formBook, setFormBook] = useState({ title: '', author: '', publication_date: '', gender: '', disponibility: true })
    const { edit } = useLocation().state || { edit: null }
    const navigate = useNavigate()

    useEffect(() => {
        if (edit != null) {
            setFormBook(edit)
        }
    }, [edit])

    const handleChange = (e) => {
        const { name, type, checked, value, files } = e.target
        setFormBook(pre => ({
            ...pre,
            [name]: type === 'checkbox' ?
                checked : type === 'file' ?
                files[0] : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (edit != null) {
            putBookAPI(edit.id, formBook)
            dispatch({
                type: 'UPDATE_BOOK',
                payload: {
                    id: edit.id,
                    updates: edit
                }
            })
        } else {
            postBookAPI(formBook)
                .then(response => {
                    dispatch({ type: 'ADD_BOOK', payload: response.data })
                })
                .catch(error => {
                    console.error("une erreur s'est produit lors de l'ajout", error)
                })
        }
        navigate('/admin/book/lists',{state:{formBook:false}})
    }

    return <>
        <div>
            <form className="container mt-4">
                <div className="card border-light bg-transparent">
                    <h1 className="border-light card-header text-info text-center"> {edit != null ? 'Modification' : 'Ajout'} d'un livre</h1>
                    <div className="card-body">
                        <div className="mb-3" >
                            <label htmlFor="title" className="form-label text-info">Titre</label>
                            <input className={`form-control bg-transparent text-info`} value={formBook.title} name="title" type="text" id="title" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="author" className="form-label text-info">Auteur</label>
                            <input value={formBook.author} className={`form-control bg-transparent text-info`} name="author" type="text" id="author" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="gender" className="form-label text-info">Genre</label>
                            <input value={formBook.gender} className={`form-control bg-transparent text-info`} name="gender" type="text" id="gender" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="publication_date" className="form-label text-info">Date de publication</label>
                            <input value={formBook.publication_date} className={`form-control bg-transparent text-info`} name="publication_date" type="date" id="publication_date" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="disponibility" className="form-label text-info">Disponibilité</label>
                            <input value={formBook.disponibility} className={`form-chek bg-transparent text-info mx-2`} name="disponibility" type="checkbox" id="disponibility" onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="picture" className="form-label text-info">Image</label>
                            <input className={`form-control bg-transparent text-info`} name="picture" type="file" id="picture" onChange={handleChange} />
                        </div>
                        <button type="submit" className={`btn btn-${edit != null ? 'warning' : 'success'} col-3 offset-4`} onClick={(event) => handleSubmit(event)}> {edit != null ? 'Modifier' : 'Ajouter'} </button>
                    </div>
                </div>
            </form>
        </div>
    </>
}