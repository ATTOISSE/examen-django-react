import React from 'react';
import { Link } from 'react-router-dom';

export const SideBar = () => {
    return (
        <div className="sidebar">
            <Link to="/admin/add" className="nav-link"><i className="bi bi-house-add-fill"></i> Ajouter Livre</Link>
            <Link to="/admin/book/lists" className="nav-link"><i className="bi bi-list-columns"></i> Liste de Livres</Link>
            <Link to="/admin/user/lists" className="nav-link"><i className="bi bi-people-fill"></i> Liste de clients</Link>
            <Link to="/admin/loan" className="nav-link"><i className="bi bi-book"></i> Liste d'emprunt</Link>
            <Link to="/admin/stat" className="nav-link"><i className="bi bi-bar-chart-line-fill"></i> Statistiques</Link>
        </div>
    );
};

