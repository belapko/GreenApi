import React, {useState} from 'react';
import '../styles/Auth.css'
import {useNavigate} from "react-router-dom";

const Auth = () => {
    const navigate = useNavigate();
    const [idInstance, setIdInstance] = useState('');
    const [apiTokenInstance, setApiTokenInstance] = useState('');

    const useAuth = () => {
        localStorage.setItem('idInstance', idInstance.trim());
        localStorage.setItem('apiTokenInstance', apiTokenInstance.trim());
        return navigate('/app')
    }

    return (
        <div className='auth-container'>
            <div className='auth-form'>
                <h1 className='auth-title'>Авторизация</h1>
                <input className='auth-input' placeholder='Введите idInstance' value={idInstance}
                       onChange={(e) => setIdInstance(e.target.value)}/>
                <input className='auth-input' placeholder='Введите apiTokenInstance' value={apiTokenInstance}
                       onChange={(e) => setApiTokenInstance(e.target.value)}/>
                <button className='auth-button' onClick={useAuth}>Войти</button>
            </div>
        </div>
    );
};

export default Auth;