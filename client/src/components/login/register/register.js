import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import api from '../../../redux/actionCreator'
import axios from 'axios'
import s from './register.module.css'


export default function REGISTER(){
    const [input, setInput] = useState({
        email: "",
        password: "",
        passwordR: "",
    })
    const [error, setError] = useState({
        email: "Email is required",
        password: "Password is required",
        passwordR: "It requires repeating the password"
    })
    const dispatch = useDispatch()

    const change = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }
    const validate = input => {
        error.email = ""
        error.password = ""
        error.passwordR = ""
        if(!input.email){
            error.email = 'Email is required'
        }else if(!/\S+@\S+\.\S+/.test(input.email)){
            error.email = 'Email is invalid'
        }
        if(!input.password){
            error.password = 'Password is required'
        }else if(input.password.length > 5){
            error.password = 'Password is to short'
        }
        if(!input.passwordR){
            error.passwordR = 'It requires repeating the password'
        }else if(input.password !== input.passwordR){
            error.passwordR = 'Passwords are not the same'
        }
        return error
    }
    async function check(){
        for(var key in error){
            if(error[key]) return alert(error[key])
        }
        const verify = await axios.get(`${process.env.REACT_APP_API_URL}/user/email/${input.email}`)
        if(!verify.data){
            dispatch(api.register(input))
        }else alert("Este mail ya está registrado")
    }

    return(
        <div className={s.form}>
            <input name="email" type="text" onChange={change} value={input.email} className={s.input} placeholder="Email..."/>
            <input name="password" type="password" onChange={change} value={input.password} className={s.input} placeholder="Password..."/>
            <input name="passwordR" type="password" onChange={change} value={input.passwordR} className={s.input} placeholder="Repeat Password..."/>
            <input type="submit" onClick={check} value="Registrarse" className={s.button}/>
        </div>
    )
}