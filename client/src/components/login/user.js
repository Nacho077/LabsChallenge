import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Login from './login/login.js'
import Register from './register/register.js'
import s from './user.module.css'
import logo from '../header/logo.ico'

export default function User(){
    const [login, setLogin] = useState(true)
    const user = useSelector(state => state.user)

    const changeForm = () => {
        setLogin(!login)
    }

    return(
        <div className={s.form}>
            <img src={logo} alt="logo"/>
            <div className={s.container}>
                {user.id && <Redirect to="/search"/>}
                {login && <Login/>}
                {!login && <Register/>}
            </div>
            <button onClick={changeForm} className={s.button}>{login ? "Registrarse" : "Iniciar Sesión"}</button>
        </div>
    )
}