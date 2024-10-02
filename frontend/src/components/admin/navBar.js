import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

export const NavBar = ({ toggleTheme, isDarkMode }) => {
    let {logoutUser} = useContext(AuthContext)
    return (
        <nav className="navbar navbar-expand-lg  m-0 p-0 ">
            <a href="/"><i className={`bi bi-house-gear-fill text-${isDarkMode ? 'light' : 'dark'} fs-4 mx-4`}></i></a>
            <a className={`navbar-brand mt-2 offset-1 text-${isDarkMode ? 'white' : 'dark'}`} href="#">Tableau de bord</a>
            <div className="ml-auto mt-2 d-flex align-items-center offset-5 ">
                <img src='/mac.jpg' alt="Profile" className="navbar-brand " />
                <button className="btn btn-outline-danger ml-2 mx-4" onClick={logoutUser}>Logout</button>
                <button className="btn border-0  ml-2" onClick={toggleTheme}>
                    {isDarkMode ? '🌞' : '🌙'}
                </button>
            </div>
        </nav>
    );
};


