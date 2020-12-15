import React from 'react'
import { Link } from 'react-router-dom'
import s from './home.module.css'
import lupa from '../../img/Lupa.png'

export default function Home(){
    return(
        <div className={s.container_main}>
            <h1 className={s.title}>Mercado Henry</h1>
            <Link to="/search">
                <div className={s.container_img}>
                    <img src={lupa} alt="imagen de lupa" className={s.image}>
                    </img>
                    <div className={s.search}>
                        <div className={s.container_buscar}>
                            <div>Buscar</div>
                            <div>Productos</div>
                        </div>
                        <div className={s.salto}>!</div>
                    </div>
                </div>
            </Link>
        </div>
    )
}