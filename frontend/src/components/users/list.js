import { useReducer, useState } from "react"
import { initialState, userReducer } from "../reducer/userReducer"
import { useEffect } from "react"
import { deleteUserAPI, getUsersAPI } from "../../services/userService"
import { type } from "@testing-library/user-event/dist/type"
import { useNavigate } from "react-router-dom"

export const ListUsers = () => {

    const [state, dispatch] = useReducer(userReducer, initialState)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [edit,setEdit] = useState(null)

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

    const handleDelete = async (e, id) => {
        e.preventDefault()
        try {
            await deleteUserAPI(id);
            const response = await getUsersAPI();
            dispatch({
                type: 'SET_USERS',
                payload: response.data
            });
        } catch (error) {
            console.error('suppression echoué', error.response.data);
        }
    }

    const navigate = useNavigate()

    const handleEdit = (edit)=>{
        setEdit(edit)
    }

    useEffect(() => {
        if (edit != null) {
            navigate('/register', { state: { edit } })
        }
    }, [edit,navigate])

    const handlePageChange = (newPage) => setPage(newPage)

    return <>
        <h2 className="text-center">Liste des utilisateurs</h2>
        <table className="table table-responsive">
            <thead>
                {state.users && Array.isArray(state.users.results) ? (
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                ) : (
                    <tr>
                        <td colSpan="4">Aucun élément chargé...</td>
                    </tr>
                )}
            </thead>
            <tbody>
                {state.users && Array.isArray(state.users.results) && state.users.results.length > 0 ? (
                    state.users.results.map((user, index) => (
                        <tr key={index}>
                            <td>{user.last_name}</td>
                            <td>{user.first_name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button type="button" className="btn btn-warning mx-1" onClick={() => handleEdit(user)}>Modifier</button>
                                <button type="button" className="btn btn-danger" onClick={(event) => handleDelete(event, user.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">Aucun utilisateur à afficher</td>
                    </tr>
                )}
            </tbody>
        </table>
        {state.users && Array.isArray(state.users.results) && totalPage > 1 && (
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
    </>
}