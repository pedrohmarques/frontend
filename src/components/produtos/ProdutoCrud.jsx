import React, { Component } from 'react'
import Main from '../template/Main'

const headerProps = {
    title: 'Meus Produtos'
}

export default class UserCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                Cadastro da Produtos
            </Main>
        )
    }
}