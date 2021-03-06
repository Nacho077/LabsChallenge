import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import api from '../../redux/actionCreator'
import logo from './logo.ico'
import SearchBar from './searchBar/searchBar.js'
import s from './index.module.css'


export default function Header({val}){
    const user = useSelector(state =>  state.user)
    const dispatch = useDispatch()

    const logOut = () => {
        dispatch(api.logout())
    }

    return(
        <div className={s.navBar}>
            <div className="navbar">
                <div className={s.container_logo}>
                    <Link to="/">
                        <div className={s.logo}>
                            <img src={logo} width="30" height="30" alt="Logo Herny" loading="lazy"/>
                            <p>Mercado Henry</p>
                        </div>
                    </Link>
                </div>
                <SearchBar home={val}/>
                {user.id ? <div className={s.logOut} onClick={logOut}><Link to="/search">Log Out</Link></div> : null}
                {!user.id && <Link to="/login" className={s.link}>Log In</Link>}
                {user.id ? (user.products && user.products.length) ? (
                    <div style={{cursor: 'pointer'}}>
                        <Link to="/favs">
                            <svg style={{color: 'red'}} width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </Link>
                    </div>
                ) : (
                    <div style={{cursor: 'pointer'}}>
                        <Link to="/favs">
                            <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" className="bi bi-heart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                            </svg>
                        </Link>
                    </div>
                ) : null}
            </div>
        </div>
    )
}