import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../redux/actionCreator'
import Header from '../header'
import Filter from '../body/filter/filters.js'
import Footer from '../footer/footer.js'
import Pages from '../body/pages/pages.js'
import s from './category.module.css'

export default function Category(props){
    const { match: { params }} = props
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const cacheCats = useSelector(state => state.cacheCats)
    const [cat, setCat] = useState([])
    const [pic, setPic] = useState([])

    useEffect(() => {
        if(cacheCats[params.id]){
            setCat(cacheCats[params.id])
            setPic(cacheCats[params.id].attributes.filter(a => a.name === 'pictures'))
        }else{
            dispatch(api.getCats(params.id, 0, 2))
            setCat(category)
        }
    }, [category, cat, params, cacheCats, dispatch])

    return(
        <div>
            <div className={s.container_more_cats}>
                <div className={s.header}>
                    <Header/>
                </div>
                <div className={s.container_img}>
                    {
                        pic && pic.length > 0 && <img src={pic[0].value} alt={"img of category"}/>
                    }
                </div>
                <div className={s.container_buttons}>
                    { cat.attributes && cat.attributes.length > 1 ? (
                        <div className={s.container_link}>
                            {cat.attributes.filter(a => a.name !== 'pictures').map(a => <Link to={a.name} className={s.link} key={a.name}>{a.value}</Link>)}
                        </div>
                            ) : (
                            <div className={s.noCats}>Ya no nos quedan categorias para recomendarte</div>
                        )
                    }    
                </div>
            </div>
            <div className={s.filter}>
                <Filter items={cat.products} id={params.id}/>
            </div>
            <Pages cat={cat} id={params.id}/>
            <Footer cat={cat}/>
        </div>
    )
}