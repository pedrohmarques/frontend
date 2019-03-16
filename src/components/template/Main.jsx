import './Main.css'
import React from 'react'
import Header from './Header'
import Footer from '../template/Footer'
import Logo from '../template/Logo'
import Nav from '../template/Nav'

export default props =>
    <React.Fragment>
        <Header {...props}></Header>
        <Logo nome = {props.nome}></Logo>
        <Nav></Nav>
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
        <Footer></Footer>
    </React.Fragment>