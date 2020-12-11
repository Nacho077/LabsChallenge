import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../redux/actionCreator.js'
import s from './pages.module.css'

export default function Pages({cat}){
    const [page, setPage] = useState({
        thisPage: 1,
        totalPage: 0,
        seePages: [1, 2, 3, 4, 5]
    })
    const cache = useSelector(state => state.cache)
    const key = useSelector(state => state.key)
    const numPage = useSelector(state => state.page)
    const category = useSelector(state => state.category)
    const dispatch = useDispatch()

    useEffect(() => {
        if(!cat){
            cache[key] &&
                setPage({
                    ...page,
                    thisPage : numPage,
                    totalPage: Math.ceil((cache[key].totalProducts / 30))
                })            
        }else{
            setPage({
                ...page,
                totalPage : cat.total_products / 30
            })
        }
    }, [cache, category])

    const changePage = (e) => {
        var newSeePages = []
        for(var i = e-4; i <= e; i++){
            if(i % 5 === 0){
                if(i === 0) newSeePages = [i+1, i+2, i+3, i+4, i+5]
                else newSeePages = [i, i+1, i+2, i+3, i+4, i+5]
            }
            
        }
        setPage({
            ...page,
            thisPage: e,
            seePages: newSeePages
        })
        dispatch(api.changePage(e))
    }

    return(
        <div className={s.container_main}>
            {!page.seePages.includes(1) && page.totalPage !== 0 &&
                <button value={1} className={s.page} onClick={(e) => changePage(Number(e.target.value))}>1</button>
            }
            {!page.seePages.includes(1) && page.totalPage !== 0 &&
                <div className={s.empty_button}>...</div>
            }
            {page.totalPage !== 0 && page.seePages.map(pag => (
                pag === page.thisPage ?
                    <button value={pag} key={pag} className={s.page_selected} onClick={(e) => changePage(Number(e.target.value))}>{pag}</button> :
                    <button value={pag} key={pag} className={s.page} onClick={(e) => changePage(Number(e.target.value))}>{pag}</button>
            ))}
        </div>
    )
}