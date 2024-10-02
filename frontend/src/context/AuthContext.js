import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {

    let authTokensFromStorage = localStorage.getItem('authTokens')
    let parsedAuthTokens = authTokensFromStorage ? JSON.parse(authTokensFromStorage) : null;
    let [authTokens, setAuthTokens] = useState(()=> parsedAuthTokens);
    let [user, setUser] = useState(()=> parsedAuthTokens ? jwtDecode(parsedAuthTokens.access) : null);

    const navigate = useNavigate();

    let loginUser = async (e) => {
        e.preventDefault();
        console.log('soumis');
        try {
            const payload = {
                email: e.target.email.value,
                password: e.target.password.value,
            };

            let response = await axios.post('http://127.0.0.1:8000/api/token/', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.status === 200) {
                const u = jwtDecode(response.data.access)
                setAuthTokens(response.data);
                setUser(jwtDecode(response.data.access));
                localStorage.setItem('authTokens', JSON.stringify(response.data));
                if(u.email === 'admin@gmail.com'){
                    navigate('/admin')
                }else{
                    navigate('/catalog',{state:{formConnecte:true}})
                }
            }

        } catch (error) {
            if (error.response) {
                console.error('Erreur de réponse:', error.response.data);
                console.error('Statut de la réponse:', error.response.status);
            } else if (error.request) {
                console.error('Aucune réponse reçue:', error.request);
            } else {
                console.error('Erreur:', error.message);
            }
        }
    };

    let logoutUser = ()=>{
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};
