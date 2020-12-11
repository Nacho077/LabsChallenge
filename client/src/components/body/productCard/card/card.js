import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../../../redux/actionCreator'
import s from './card.module.css'
import Puntaje from './puntaje/puntaje.js'

export default function Card ({product, onBack}){
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const addfav = () => {
        dispatch(api.addfav({userId: user.id, productId: product.id}))
    }
    const removefav = () => {
        dispatch(api.removefav({userId: user.id, productId: product.id}))
    }

    return(
        <div className={s.container_main}>
            <div className={s.container_div}>
                <div className={s.container_back} onClick={onBack}>
                    <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-x" fillRule="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </div>
                <div className={s.container_header}>
                    <img src={product.img} alt={product.name}/>
                    <div className={s.container_product}>
                        <h2 className={s.title}>
                        {product.name}
                        </h2>
                        <div className={s.container_metodoPago}>
                            <div className={s.cantidad}>
                                {product.available_quantity === 0 ?
                                    <p>Ya no quedan unidades disponibles</p> :
                                    product.available_quantity > 1 ?
                                    <p>Nos quedan {product.available_quantity} unidades<br/>Consegui la tuya!</p> :
                                    <p>Es la ultima unidad!</p>
                                }
                            </div>
                            {product.acept_MP ? 
                                <p className={s.acept_MP}>Podes conseguirlo con Mercado Pago!</p> :
                                <p className={s.reject_MP}>No acepta Mercado Pago</p>
                            }
                        </div>
                        <Link to={`/product/${product.product_id}`} className={s.link}>
                            Ver mas información del producto
                        </Link>
                    </div>
                    <div className={s.container_perfil}>
                        <h3>Datos del vendedor:</h3>
                        <Puntaje num={product.seller_reputation_level}/>
                    </div>
                    <div className={s.heart}>
                        {user.products ? user.products.find(p => p.name === product.name) ? (
                            <div className={s.container_heart} onClick={removefav}>
                                <p>Quitar de Favoritos</p>
                                <svg style={{color: 'red'}} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                                </svg>
                            </div>) : (
                            <div className={s.container_heart} onClick={addfav}>
                                <p>Agregar a Favoritos</p>
                                <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                                </svg>
                            </div>
                            ) : null
                        }
                    </div>
                </div>
                <hr/>
            </div>
        </div>
    )
}