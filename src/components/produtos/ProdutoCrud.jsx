import React, { Component } from 'react'
import Main from '../template/Main'
import FieldAdd from './components/FieldAdd';
import TableProdutos from './components/TableProdutos';

const headerProps = {
    icon: 'shopping-cart',
    title: 'Meus Produtos'
}

export default class UserCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                <FieldAdd classButton="btn btn-dark center-block" classIcon="fa fa-plus" iconContent="Novo Produto"/>
                <TableProdutos/>
            </Main>
        )
    }
}