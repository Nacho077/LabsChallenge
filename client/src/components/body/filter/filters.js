import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../redux/actionCreator'
import ProductCard from '../productCard/productCard.js'
import s from './filter.module.css'

export default function Filters({items, id}){
    const [filters, setFilters] = useState({
        order: 'todos',
        filter: 'todos'
    })
    const [seeItems, setItems] = useState([])
    const page = useSelector(state => state.page)
    const key = useSelector(state => state.key)
    const dispatch = useDispatch()
    
    useEffect(() => {
        setFilters({
            order: 'todos',
            filter: 'todos'
        })
        setItems(items)
    }, [items])
    
    const onChangeFilter = (e) => {
        setFilters({
            ...filters,
            filter: e.target.value
        })
        changeOrder("filter", e.target.value)
    }
    const onChangeOrder = (e) => {
        setFilters({
            ...filters,
            order: e.target.value
        })
        changeOrder("order", e.target.value)
    }
    const changeOrder = (change, value) => {
        var newSeeItems = seeItems
        if(change === 'filter'){
            if(value === 'todos'){
                newSeeItems = items
            }
            if(value !== 'todos'){
                newSeeItems = items.filter(i => i.condition === value)
            }
        }
        if(change === 'order'){
            if(value === 'todos'){
                if(newSeeItems.length) newSeeItems = newSeeItems.sort((a, b) => a.id - b.id)
            }
            if(value === 'menorPrecio'){
                if(newSeeItems.length) newSeeItems = newSeeItems.sort((a, b) => a.price - b.price)
            }
            if(value === 'mayorPrecio'){
                if(newSeeItems.length) newSeeItems = newSeeItems.sort((a, b) => b.price - a.price)
            }
        }
        setItems(newSeeItems)
    }
    const cargarMasProductos = () => {
        id ? 
        dispatch(api.getCats(id, Math.round(items.length / 50), (Math.round(items.length / 50)))):
        dispatch(api.getItems(key, Math.round(items.length / 50), (Math.round(items.length / 50))))
    }

    return(
        <div className={s.container_main}>
            <div className={s.container_filtros}>
                <div className={s.filtro}>
                    <p>Ordenar por</p>
                    <select name="order" value={filters.order} onChange={onChangeOrder}>
                        <option value={"todos"}>Elija una opción</option>
                        <option value={"menorPrecio"}>Menor precio</option>
                        <option value={"mayorPrecio"}>Mayor precio</option>
                    </select>
                </div>
                <div className={s.filtro}>
                    <p>Mostrar productos</p>
                    <select name="filter" value={filters.filter} onChange={onChangeFilter}>
                        <option value={"todos"}>Todos</option>
                        <option value={"new"}>Nuevos</option>
                        <option value={"used"}>Usados</option>
                    </select>
                </div>
            </div>
            {seeItems && seeItems.length ? seeItems.slice((page - 1) * 30, page * 30).length === 30 ? 
                <div className={s.container_products}>
                    {seeItems.slice((page - 1) * 30, page * 30).map(i => (
                        <ProductCard product={i}/>
                    ))}
                </div> : 
                <div className={s.primer}>{cargarMasProductos()}Cargando más productos...</div> :
                <div className={s.primer}>Haz tu primera busqueda!</div>
            }
        </div>
    )
}