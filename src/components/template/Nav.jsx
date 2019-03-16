import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
(
    <aside className="menu-area">
        <nav className="menu">
            <Link to="/list">
                <i className="fa fa-list-alt"></i> Listas
            </Link>
            <Link to="/categories">
                <i className="fa fa-folder"></i> Categorias
            </Link>
            <Link to="/products">
                <i className="fa fa-shopping-cart"></i> Produtos
            </Link>
            <Link to="/">
                <i></i> Sair
            </Link>
        </nav>
    </aside>
)