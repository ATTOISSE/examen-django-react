import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import AuthContext from './context/AuthContext';
import { Link } from 'react-router-dom';

export function Nav() {
    let {user,logoutUser} = useContext(AuthContext)

    return <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand offset-1" href="/"> <b> LIBRARY</b></a>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link mx-3 ">Home</Link>
                    </li>
                    {user &&(
                    <li className="nav-item">
                        <Link to="/catalog" className="nav-link mx-3 ">Bibliotheque</Link>
                    </li>
                    )}
                    {user &&(
                    <li className="nav-item ">
                        <Link to="/loan" className="nav-link mx-3 ">Liste d'Emprunts</Link>
                    </li>
                    )}
                    <li className="nav-item ">
                        {user ? (
                        <a  className="nav-link mx-3 " onClick={logoutUser}>Se deconnecter</a>
                        ):(

                            <Link to="/login" className="nav-link mx-3 ">S'authentifier</Link>
                        )
                    }
                    </li>
                </ul>
            </div>
        </nav>
    </>
}
