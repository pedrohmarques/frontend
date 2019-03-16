import React, { Component } from 'react'
import Main from '../template/Main'
import FieldAdd from './components/FieldAdd';

const headerProps = {
    icon: 'shopping-cart',
    title: 'Meus Produtos'
}

export default class UserCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                <FieldAdd description="Adicionar Produto"/>
            </Main>
        )
    }
}