import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import s from './productCard.module.css'
import Card from './card/card.js'

export default function ProductCard({product}){
    const [card, setCard] = useState(false)
    const seeCard = () => {
        setCard(!card)
    }
    const user = useSelector(state => state.user)
    var price = product.price
    var num2 = price.toString().split('.'); 
    var thousands = num2[0].split('').reverse().join('').match(/.{1,3}/g).join(','); 
    var decimals = (num2[1]) ? '.' + num2[1] : ''; 
    var answer = thousands.split('').reverse().join('') + decimals;

    return(
        <div className={s.card}>
            {!card ?
                <div className={s.cardProduct} onClick={seeCard}>
                    {user.products && user.products.find(e => e.name === product.name) &&
                        <div className={s.heart}>
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </div>
                    }
                    <img src={product.img} className="card-img-top" alt={product.name}/>
                    <div className="card-body">
                        <h5 className="card-title">{product.name}</h5>
                        <div className={s.container_details}>
                            <p className="card-text">
                                {product.currency_id === "ARS" ? "$" : product.currency_id}
                                {answer}
                            </p>
                            <p className={s.condicion}>Este producto es {product.condition === 'used' ? "usado" : "nuevo"}</p>
                            <p className={s.stock}>Quedan {product.available_quantity} disponibles</p>
                        </div>
                    </div>
                    <div>
                        
                    </div>
                </div>:
                <div className={s.container_card}>
                    <Card product={product} key={product.id} onBack={seeCard}/>
                </div>
            }
        </div>
    )
}