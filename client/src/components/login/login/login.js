import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import api from '../../../redux/actionCreator'
import s from './login.module.css'

export default function Login(){
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const [error, setError] = useState({
        email: "Email is required",
        password: "Password is required",
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
        if(!input.email){
            error.email = 'Email is required'
        }else if(!/\S+@\S+\.\S+/.test(input.email)){
            error.email = 'Email is invalid'
        }
        if(!input.password){
            error.password = 'Password is required'
        }
        return error
    }
    async function check(){
        for(var key in error){
            if(error[key]) return alert(error[key])
        }
        dispatch(api.login(input))
    }

    return(
        <div className={s.form}>
            <input name="email" type="text" onChange={change} value={input.email} className={s.input} placeholder="Email..."/>
            <input name="password" type="password" onChange={change} value={input.password} className={s.input} placeholder="Password..."/>
            <input type="submit" onClick={check} value="Logearse" className={s.button}/>
        </div>
    )
}