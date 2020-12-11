import React, { useState, useEffect } from 'react'
import s from './puntaje.module.css'

export default function Puntaje({num}){
    const [points, setPoints] = useState({
        one: {
            value: false,
            color: "red"
        },
        two: {
            value: false,
            color: "orange"
        },
        three: {
            value: false,
            color: "yellow"
        },
        four: {
            value: false,
            color: "lightgreen"
        },
        five: {
            value: false,
            color: "green"
        }
    })
    useEffect(() => {
        if(num === null) return null
        const puntos = Number(num.split("")[0])
        var activeColor = points[Object.keys(points)[puntos - 1]].color
        setPoints({
            ...points,
            [Object.keys(points)[puntos - 1]]: {
                value: true,
                color: activeColor
            }
        })
    }, [num, points])

    return(
        <div className={s.container_main}>
            <div className={s.container}>
                {Object.keys(points).map(key => (
                    points[key].value === true  && num !== null ? 
                        <div key={key} className={s.active} style={{backgroundColor: points[key].color}}></div> :
                        <div key={key} className={s.inactive} style={{backgroundColor: points[key].color}}></div>
                ))}
            </div>
            {num !== null ?
               Object.keys(points).map(key => (
                    points[key].value && 
                        <p style={{color: points[key].color}} className={s.text} key={key}>
                        Este es un vendedor de {num.split("")[0]} estrellas!
                        </p>
                    )) :
                <p className={s.text}>
                    Este vendedor aun no tiene calificaciones<br/>Se el primero en dejar una!
                </p>
            }
        </div>
    )
}
