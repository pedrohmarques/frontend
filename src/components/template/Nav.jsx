import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
(
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/">
                <i className="fa fa-home"></i> Início
            </Link>
            <Link to="/list">
                <i className="fa fa-flag"></i> Listas
            </Link>
            <Link to="/categories">
                <i className="fa fa-flag"></i> Categorias
            </Link>
            <Link to="/products">
                <i className="fa fa-flag"></i> Produtos
            </Link>
            <Link to="/exit">
                <i></i> Sair
            </Link>
        </nav>
    </aside>
)