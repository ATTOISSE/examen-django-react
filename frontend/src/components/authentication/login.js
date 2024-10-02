import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'

export const Login = () => {

    let {loginUser} = useContext(AuthContext)

    const notify = ()=> toast.success('Inscription reussie, Vous pouvez maintenant vous connecter')

    const location = useLocation()

    useEffect(()=>{
        if(location.state?.formRegister){
            notify()
        }
    },[location.state])
    
    return <div className='App-img'>
        <form onSubmit={loginUser} className='container col-6 offset-5'>
            <div className="card border-light bg-transparent">
                <h1 className="border-light card-header text-white text-center"> Authentification </h1>
                <div className="card-body">
                    <div className="mb-3" >
                        <input
                            type="email"
                            name='email'
                            className='form-control bg-transparent text-white'
                            placeholder="Votre email"
                        />
                    </div>
                    <div className="mb-3" >
                        <input
                            type="password"
                            name='password'
                            placeholder="Mot de passe"
                            className='form-control bg-transparent text-white'
                        />
                    </div>
                    <button type="submit" className='btn btn-primary offset-4'>Se connecter</button> <a href='register' className='text-white mx-2'>S'inscrire</a>
                </div>
            </div>
        </form>
        <ToastContainer />
    </div>
};

export default Login;



