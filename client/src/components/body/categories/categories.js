import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import api from '../../../redux/actionCreator.js'
import s from './categories.module.css'

export default function Categories(){
    const [cat, setCat] = useState([])
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories)
    const items = useSelector(state => state.items)

    useEffect(() => {
        dispatch(api.getCategories())
        setCat(categories)
    }, [categories, dispatch])
    
    return(
        <div className={s.container_main}>
            <ul>
            {cat && cat.map(c => (
                <Link to={`/category/${c.id}`} key={c.id}>
                    <li className={s.container_cat} style={items.length === 0 ? {marginLeft: '-150px'} : null}>{c.name}</li>
                </Link>
            ))}
            </ul>
        </div>
    )
}