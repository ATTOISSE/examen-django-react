import axios from "axios";

const token = JSON.parse(localStorage.getItem('authTokens'));
export const getLoansByUserAPI = () => {
    
    if (!token) {
        throw new Error('Token JWT manquant');
    }

    return axios.get(`http://127.0.0.1:8000/api/loans/user`, {
        headers: {
            'Authorization': `Bearer ${token.access}`
        }
    });
};

export const getLoansAPI = (page) => {
    
    if (!token) {
        throw new Error('Token JWT manquant');
    }

    return axios.get(`http://127.0.0.1:8000/api/loans?page=${page}`, {
        headers: {
            'Authorization': `Bearer ${token.access}`
        }
    });
};

export const postLoanAPI = (loan) => axios.post('http://127.0.0.1:8000/api/loans/',loan)
// export const deleteLoanAPI = (id)=> axios.delete(`http://127.0.0.1:8000/api/loans/${id}/`) 
// export const putLoanAPI = (id,loan)=> axios.put(`http://127.0.0.1:8000/api/loans/${id}/`,loan)