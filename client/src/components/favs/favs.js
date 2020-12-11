import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../header'
import ProductCard from '../body/productCard/productCard.js'
import s from './favs.module.css'

export default function Favs(){
    const user = useSelector(state => state.user)

    return(
        <div className={s.container}>
            <div className={s.header}>
                <Header/>
            </div>
            <div className={s.container_products}>
                { user.products.length ?
                    user.products.map(item => (
                        <ProductCard product={item}/>
                    )) : 
                    <div className={s.empty}>Aun no tienes favoritos</div>
                }
            </div>
        </div>
    )
}