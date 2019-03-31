import React, { Component } from 'react'
import Main from '../template/Main'
import FieldAdd from './components/FieldAdd';
import TableCategorias from './components/TableCategorias';

const headerProps = {
    icon: 'folder',
    title: 'Minhas Categorias'
}

export default class CategoriaCrud extends Component {
    render(){
        return(
            <Main {...headerProps}>
                <FieldAdd classButton="btn btn-dark center-block" classIcon="fa fa-plus" iconContent="Nova Categoria"/>
                <TableCategorias/>
            </Main>
        )
    }
}