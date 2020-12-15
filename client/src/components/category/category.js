import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import api from '../../redux/actionCreator'
import Filter from '../body/filter/filters.js'
import Pages from '../body/pages/pages.js'
import s from './category.module.css'

export default function Category(props){
    const { match: { params }} = props
    const dispatch = useDispatch()
    const category = useSelector(state => state.category)
    const cacheCats = useSelector(state => state.cacheCats)
    const this_cat = useSelector(state => state.this_cat)
    const categories = useSelector(state => state.categories)
    const [thisCat, setThisCat] = useState("")
    const [cat, setCat] = useState([])
    const [pic, setPic] = useState([])

    useEffect(() => {
        if(cacheCats[params.id]){
            setCat(cacheCats[params.id])
            setPic(cacheCats[params.id].attributes.filter(a => a.name === 'pictures'))
            setThisCat(this_cat)
        }else{
            dispatch(api.getCats(params.id, 0, 2))
            setCat(category)
            setThisCat(this_cat)
        }
    }, [category, cat, params, cacheCats, dispatch])

    const setnewCategory = (cat) => {
        dispatch(api.selectCat(cat))
    }

    return(
        <div>
            <div className={s.container_more_cats}>
                <div className={s.container_top}>
                    <div clasName={s.container_title}>
                        <h1 className={s.title}>{thisCat}</h1>
                    </div>
                    <div className={s.container_img_buttons}>
                        <div className={s.container_img}>
                            {
                                pic && pic.length > 0 && <img src={pic[0].value} alt={"img of category"}/>
                            }
                        </div>
                        <div className={s.container_buttons}>
                            { cat.attributes && cat.attributes.length > 1 ? (
                                <div className={s.container_link}>
                                    {cat.attributes.filter(a => a.name !== 'pictures').map(a => <Link to={a.name} className={s.link} key={a.name} onClick={() => setnewCategory(a.value)}>{a.value}</Link>)}
                                </div>
                                    ) : (
                                    <div className={s.container_link}>
                                       <div>Otras categorias que te pueden interesar:</div>{categories.slice(1,  10).map(c => <Link className={s.link} onClicl={() => setnewCategory(c.name)}>{c.name}</Link>)}
                                    </div>
                                )
                            }    
                    </div>
                    </div>
                </div>
            </div>
            <div className={s.filter}>
                <Filter items={cat.products} id={params.id}/>
            </div>
            <Pages cat={cat} id={params.id}/>
        </div>
    )
}