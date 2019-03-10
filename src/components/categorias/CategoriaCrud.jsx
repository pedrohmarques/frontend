import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    icon: 'folder',
    title: 'Minhas Categorias'
}

export default class CategoriaCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                Cadastro da Categoria
            </Main>
        )
    }
}