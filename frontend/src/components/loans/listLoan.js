import { useContext, useReducer, useState } from "react"
import { useEffect } from "react"
import { type } from "@testing-library/user-event/dist/type"
import { useNavigate } from "react-router-dom"
import { initialState, loanReducer } from "../reducer/loanReducer"
import { deleteLoanAPI, getLoansAPI } from "../../services/loanService"
import { Nav } from "../../nav"
import AuthContext from "../../context/AuthContext"

export const LoanList = () => {

    let {user} = useContext(AuthContext)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [loans, setLoans] = useState([])

    useEffect(() => {
        getLoansAPI(page)
            .then(response => {
                setLoans(response.data.results)
                setTotalPage(Math.ceil(response.data.count / 8))
            })
            .catch(error => {
                console.error('erreur de chargement des donnes ...', error);

            })
    }, [page])

    const handleDelete = async (e, id) => {
        e.preventDefault()
        const loan = loans.filter(l=>l.id != id)
        setLoans(loan)
    }

    const handlePageChange = (newPage) => setPage(newPage)

    return <>
        <Nav />
        <div className="container mt-4">
            <table className="table table-responsive">
                <thead>
                    {loans && loans.length > 0 ? (
                        <tr>
                            <th>Book</th>
                            <th>Auteur</th>
                            <th>Date Emprunt</th>
                            <th>Date Retoure</th>
                            <th>Actions</th>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="5">Aucun élément chargé...</td>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {loans && loans.length > 0 ? (
                        loans.map((loan, index) => (
                            <tr key={index}>
                                <td>{loan.book}</td>
                                <td>{loan.user}</td>
                                <td>{loan.borrowing_date}</td>
                                <td>{loan.return_date}</td>
                                <td>
                                    <button type="button" className="btn btn-danger" onClick={(event) => handleDelete(event, loan.id)}>Archiver</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">Aucun emprunt à afficher</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {loans && loans.length > 0  && totalPage > 1 && (
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
        </div>
    </>
}