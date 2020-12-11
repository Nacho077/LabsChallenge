import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../footer/footer.js'
import s from './home.module.css'

export default function Home(){
    return(
        <div className={s.container_main}>
            <h1 className={s.title}>Mercado Henry</h1>
            <button>
                <Link to="/search" className={s.link}>Buscar productos<div className={s.salto}>!</div></Link>
            </button>
            <Footer/>
        </div>
    )
}