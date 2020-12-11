import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../../redux/actionCreator'
import s from './searchBar.module.css'

export default function SearchBar({home}){
    const [input, setInput] = useState('')
    const dispatch = useDispatch()
    const cache = useSelector(state => state.cache)

    const onChange = (e) => {
        setInput(e.target.value)
    }
    const onSubmit = () => {
        if(cache[input.toLowerCase()]){
            dispatch(api.setItems(cache[input.toLowerCase()].products))
            dispatch(api.setKey(input))
            dispatch(api.changePage(1))
        }else{
            dispatch(api.getItems(input, 0, 2))
            dispatch(api.setKey(input.toLowerCase()))
            dispatch(api.changePage(1))
        }
    }
    const clearInput = () => {
        setInput('')
    }

    return(
        <div>
            <div className={s.container}>
                <input value={input} onChange={onChange} placeholder="Busca productos, marcas y más..."/>
                <div>
                    {input.length > 0 && 
                        <button onClick={clearInput}className={s.borrar}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-x" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    }
                    {home ? (
                        <button onClick={onSubmit}>
                        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                        </svg>
                        </button>) :(
                        <Link to="/search">
                            <button onClick={onSubmit}>
                                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-search" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                                </svg>
                            </button>
                        </Link>)
                    }
                </div>
            </div>
        </div>
    )
}