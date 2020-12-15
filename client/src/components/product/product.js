import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../redux/actionCreator.js'
import Puntaje from '../body/productCard/card/puntaje/puntaje.js'
import Carousel from './carousel/carousel.js'
import s from './product.module.css'

export default function Product(props){
    const { match: { params } } = props;
    const dispatch = useDispatch()
    const products = useSelector(state =>  state.products)
    const cacheProducts = useSelector(state => state.cacheProducts)
    const user = useSelector(state => state.user)
    const [prod, setProd] = useState({})
    
    useEffect(() => {
        if(cacheProducts[params.id]){
            setProd(cacheProducts[params.id].product)
        }else{
            dispatch(api.getProduct(params.id))
            setProd(products)
        }
    }, [products])

    var price = Number(prod.price)
    var num2 = price.toString().split('.'); 
    var thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join(','); 
    var decimals = (num2[1]) ? '.' + num2[1] : ''; 
    var answer = thousands.split('').reverse().join('') + decimals;

    const addfav = () => {
        dispatch(api.addfav({userId: user.id, productId: prod.id}))
    }
    const removefav = () => {
        dispatch(api.removefav({userId: user.id, productId: prod.id}))
    }

    return(
        <div>
            {Object.keys(prod).length ? (
            <div className={s.container_main}>
                <div className={s.container_presentacion}>
                    <div className={s.carousel_container}>
                        <Carousel className={s.carousel}/>
                    </div>
                    <div className={s.container_datos}>
                        <h1>{prod.name}</h1>
                        <p className={s.precio}>{prod.currency_id === 'ARS' ? '$' : prod.currency_id} {answer}</p>
                        <p className={s.quantity}>
                            {prod.available_quantity > 0 ?
                                (prod.available_quantity > 1 ? `Quedan ${prod.available_quantity} unidades` :
                                'Esta es la ultima unidad!') :
                                'Ya no quedan unidades disponibles'
                            }
                        </p>
                        <div className={s.condition}><p>Condición: </p><p className={s.nuevo}>{prod.condition === 'new'? 'Nuevo' : 'Usado'}</p></div>
                        <div className={s.puntaje}>
                            <Puntaje num={prod.seller_reputation_level}/>
                        </div>
                        <div>
                            <a href={prod.permalink} target="_blank" rel="noreferrer" style={{fontSize: '30px'}}>ir al enlace del producto</a>
                        </div>
                        {user.products ? user.products.find(p => p.name === prod.name) ? (
                            <div className={s.container_heart} onClick={removefav}>
                                <p>Quitar de Favoritos</p>
                                <svg style={{color: 'red'}} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                            </div>) : (
                            <div className={s.container_heart} onClick={addfav}>
                                <p>Agregar a Favoritos</p>
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                            </div>
                            ) : null
                        }
                    </div>
                </div>
                <div className={s.empty_div}></div>
                <div className={s.container_especificaciones}>
                    <p className={s.description}>{prod.description}</p>
                    <div className={s.especificaciones}>
                        {prod.acept_MP && <p className={s.acept_MP}>Acepta Mercado Pago!</p>}
                        <div className={s.info}>
                                <p>Pais: {prod.pais}</p>
                                <p>Provincia: {prod.prov}</p>
                                <p>Vendió {prod.sold_quantity} productos</p>
                        </div>
                        <table className={s.container_table}>
                            <tbody>
                                {prod.attributes.filter(a => a.name !== 'pictures').map(a => (
                                    <tr key={a.name}>
                                        <td className={s.table_name}>{a.name}</td>
                                        <td className={s.table_value}>{a.value}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>) : <div className={s.cargando}>Cargando...</div>}
        </div>
    )
}