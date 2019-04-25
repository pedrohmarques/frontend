import React, {Component} from 'react'
import Main from '../../template/Main'

import TableCategoria from './TableCategoria'
import Comentario from '../comentarios/Comentario'
import Lista from './Lista'


export default class DetalheLista extends Component{
    constructor(props){
        super(props)
        const listaAtual = localStorage.getItem('listSelect')
        const listaNome = listaAtual == null ? '' : JSON.parse(listaAtual).nome
        this.state = {
            list: [],
            header: {
                icon: 'list-alt',
                title: 'Lista: ' + listaNome
            }
        }
    }

    render(){
        return(
            <Main {...this.state.header}>
                <Lista></Lista>
                <Comentario></Comentario>
                <TableCategoria></TableCategoria>
            </Main>
        )
    }
}