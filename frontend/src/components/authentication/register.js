import { useEffect, useReducer, useState } from "react"
import { getUsersAPI, postUserAPI, putUserAPI } from "../../services/userService"
import { initialState, userReducer } from "../reducer/userReducer"
import { type } from "@testing-library/user-event/dist/type"
import { useLocation, useNavigate } from "react-router-dom"

export const Register = () => {

    const [formUser, setFormUser] = useState({ last_name: '', first_name: '', email: '', password: '' })
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [state, dispatch] = useReducer(userReducer, initialState)
    const { edit } = useLocation().state || { edit: null }
    const navigate = useNavigate()

    const handleChange = (e) => {
        const { value, name } = e.target
        setFormUser(
            pre => ({
                ...pre,
                [name]: value
            })
        )
    }

    useEffect(() => {
        getUsersAPI()
            .then(response => {
                dispatch({
                    type: 'SET_USERS',
                    payload: response.data
                })
                setTotalPage(Math.ceil(response.data.count / 8))
            })
            .catch(error => {
                console.error('erreur de chargement des utilisateurs ...', error);

            })
    }, [page])

    useEffect(() => {
        if (edit !== null) {
            setFormUser({
                last_name: edit.last_name || '',
                first_name: edit.first_name || '',
                email: edit.email || '',
                password: edit.password || ''
            });
        }
    }, [edit]);


    const handleRegister = (e) => {
        e.preventDefault()
        if (edit !== null) {
            putUserAPI(edit.id, formUser)
                .then(response => {
                    dispatch({
                        type: 'UPDATE_USER',
                        payload: {
                            id: edit.id,
                            updates: response.data
                        }
                    })
                })
            navigate('/admin/user/lists')
        } else {
            postUserAPI(formUser)
                .then(response => {
                    dispatch({
                        type: 'ADD_USER',
                        payload: response.data
                    })
                }).
                catch(error => {
                    if (error.response) {
                        console.log(error.response.data);
                    }
                })
            navigate('/',{state : {formRegister:true}})
        }
    }

    return <>
        <form className="container mt-4">
            <div className="card border-light bg-transparent">
                <h1 className="border-light card-header text-info text-center"> {edit != null ? 'Modification' : 'Inscription'} d'utilisateur</h1>
                <div className="card-body">
                    <div className="mb-3" >
                        <label htmlFor="last_name" className="form-label text-info">Nom</label>
                        <input className={`form-control bg-transparent text-info`} value={formUser.last_name} name="last_name" type="text" id="last_name" onChange={handleChange} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="first_name" className="form-label text-info">Prénom</label>
                        <input className={`form-control bg-transparent text-info`} value={formUser.first_name} name="first_name" type="text" id="first_name" onChange={handleChange} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="email" className="form-label text-info">Email</label>
                        <input className={`form-control bg-transparent text-info`} value={formUser.email} name="email" type="email" id="email" onChange={handleChange} />
                    </div>
                    <div className="mb-3" >
                        <label htmlFor="password" className="form-label text-info">Mot de passe</label>
                        <input className={`form-control bg-transparent text-info`} value={formUser.password} name="password" type="password" id="password" onChange={handleChange} />
                    </div>
                    <button className={`btn btn-${edit !== null ? 'warning' : 'primary'} offset-5 col-3 mt-1`} onClick={(event) => handleRegister(event)}> {edit != null ? 'Modifier' : "S'inscrire"} </button>
                </div>
            </div>
        </form>
    </>
}