import React, { Component } from 'react'
import Main from '../template/Main'
import FieldAdd from './components/FieldAdd';
import TableCategorias from './components/TableCategorias';

const headerProps = {
    icon: 'folder',
    title: 'Minhas Categorias'
}

const baseUrl = "https://will-list.herokuapp.com/"
export default class CategoriaCrud extends Component {
    constructor(props){
        super(props)
        this.child = React.createRef();
        this.listCategorias = this.listCategorias.bind(this)
    }
    listCategorias (){
        this.child.current.listCategorias()
    };   
    
    render(){
        return(
            <Main {...headerProps}>
                <FieldAdd baseUrl={baseUrl} classButton="btn btn-dark center-block" classIcon="fa fa-plus" iconContent="Nova Categoria" listCategorias={this.listCategorias}/>
                <TableCategorias baseUrl={baseUrl} ref={this.child}/>
            </Main>
        )
    }
}