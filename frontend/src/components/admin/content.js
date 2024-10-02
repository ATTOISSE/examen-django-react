import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {AddBook} from '../books/addBook.js'
import {ListBooks} from '../books/listBook.js'
import {ListUsers} from '../users/list.js'
import { LoanList } from '../loans/listLoan.js';
export const Content = () => {
    return (
        <div className="content">
            <Routes>
                <Route path="/add" element={<AddBook />} />
                <Route path="/book/lists" element={<ListBooks />} />
                <Route path="/user/lists" element={<ListUsers />} />
                <Route path="/loan" element={<LoanList />} />
                <Route path="/stat" element={<h2>Hello from Statistiques</h2>} />
                <Route path="/" element={
                    <div>
                        <h1 className='text-center'>Bienvenue sur le Tableau de Bord</h1>
                        <p className='text-center'>Sélectionnez une option dans la sidebar pour afficher le contenu.</p>
                    </div>
                } />
            </Routes>
        </div>
    );
};

