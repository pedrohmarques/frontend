import './Logo.css'
import User from '../../assets/imgs/user.png'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
(
    <aside className='logo'>
        <Link to="/home" className="logo">
            <img src={User} alt="logo"></img>
        </Link>
        <h1>{props.nome}</h1>
    </aside>
)