import React from 'react'
import Header from '../header'
import Body from '../body'
import Footer from '../footer/footer.js'
import s from './search.module.css'

export default function Search(){
    return(
        <div>
            <div className={s.header}>
                <Header val={true}/>
            </div>
            <div className={s.body}>
                <Body/>
            </div>
            <Footer/>
        </div>
    )
}