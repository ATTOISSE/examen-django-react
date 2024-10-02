import axios from 'axios'
const token = JSON.parse(localStorage.getItem('authTokens'));
export const getBooksAPI = (page) => {

    if (!token) {
        throw new Error('Token JWT manquant');
    }

    return axios.get(`http://127.0.0.1:8000/api/books/?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token.access}`
        }
    });
};

export const deleteBookAPI = (id) => axios.delete(`http://127.0.0.1:8000/api/books/${id}/`)
export const putBookAPI = (id, book) => {
    return axios.put(`http://127.0.0.1:8000/api/books/${id}/`, book, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const postBookAPI = (book) => axios.post('http://127.0.0.1:8000/api/books/', book, {
    headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token.access}`
    },
})