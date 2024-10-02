import { useContext, useState } from "react"
import { useEffect } from "react"
import { type } from "@testing-library/user-event/dist/type"
import {  getLoansByUserAPI } from "../../services/loanService"
import { Nav } from "../../nav"
import AuthContext from "../../context/AuthContext"

export const Loan = () => {

    let {user} = useContext(AuthContext)
    const [totalPage, setTotalPage] = useState(1)
    const [page, setPage] = useState(1)
    const [loans, setLoans] = useState([])

    useEffect(() => {
        getLoansByUserAPI
            .then(response => {
                setLoans(response.data)
                setTotalPage(Math.ceil(response.data.count / 8))
            })
            .catch(error => {
                console.error('erreur de chargement des donnes ...', error);

            })
    }, [])

    const handleDelete = async (e, id) => {
        e.preventDefault()
        const loan = loans.filter(l=>l.id != id)
        setLoans(loan)
    }

    const handlePageChange = (newPage) => setPage(newPage)

    return <>
        <Nav />
        <div className="container mt-4">
            <h2 className="text-center mt-3">Liste des emprunts de {user.first_name}-{user.last_name} </h2>
            <table className="table table-responsive">
                <thead>
                    {loans && loans.length > 0 ? (
                        <tr>
                            <th>Titre</th>
                            <th>Auteur</th>
                            <th>Genre</th>
                            <th>Date Emprunt</th>
                            <th>Date Retoure</th>
                            <th>Actions</th>
                        </tr>
                    ) : (
                        <tr>
                            <td colSpan="6">Aucun élément chargé...</td>
                        </tr>
                    )}
                </thead>
                <tbody>
                    {loans && loans.length > 0 ? (
                        loans.map((loan, index) => (
                            <tr key={index}>
                                <td>{loan.book_title}</td>
                                <td>{loan.book_author}</td>
                                <td>{loan.gender}</td>
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
        </div>
    </>
}