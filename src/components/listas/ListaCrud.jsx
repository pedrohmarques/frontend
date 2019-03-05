import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    title: 'Lista de Compras'
}

export default class ListaCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                Cadastro da ListaS
            </Main>
        )
    }
}