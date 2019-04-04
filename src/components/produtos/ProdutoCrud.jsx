import React, { Component } from 'react'
import Main from '../template/Main'
import FieldAdd from './components/FieldAdd';
import TableProdutos from './components/TableProdutos';

const headerProps = {
    icon: 'shopping-cart',
    title: 'Meus Produtos'
}

const baseUrl = "https://will-list.herokuapp.com/"
export default class UserCrud extends Component {
    constructor(props){
        super(props)
        this.child = React.createRef();
        this.listProdutos = this.listProdutos.bind(this)
    }
    listProdutos (){
        this.child.current.listProdutos()
    }   
    render(){
        return(
            <Main {...headerProps}>
                <FieldAdd baseUrl={baseUrl} classButton="btn btn-dark center-block" classIcon="fa fa-plus" iconContent="Novo Produto" listProdutos={this.listProdutos}/>
                <TableProdutos baseUrl={baseUrl} ref={this.child}/>
            </Main>
        )
    }
}