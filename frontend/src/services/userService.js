import axios from "axios";

const token = JSON.parse(localStorage.getItem('authTokens'));

export const getUsersAPI = () => {
    
    if (!token) {
        throw new Error('Token JWT manquant');
    }

    return axios.get('http://127.0.0.1:8000/api/users/', {
        headers: {
            'Authorization': `Bearer ${token.access}`
        }
    });
};
export const postUserAPI = (user)=>axios.post('http://127.0.0.1:8000/api/users/',user) 
export const deleteUserAPI = (id)=> axios.delete(`http://127.0.0.1:8000/api/users/${id}/`) 
export const putUserAPI = (id,user)=> axios.put(`http://127.0.0.1:8000/api/users/${id}/`,user)