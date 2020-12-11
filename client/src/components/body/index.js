import React from 'react'
import { useSelector } from 'react-redux'
import Filters from './filter/filters.js'
import Pages from './pages/pages.js'
import Categories from './categories/categories.js'
import s from './body.module.css'

export default function Body(){
    const items = useSelector(state => state.items)

    return(
        <div className={s.body}>
            <div className={s.products}>
                <Categories className={s.category}/>
                <Filters items={items}/>
            </div>
            <Pages/>
        </div>
    )
}