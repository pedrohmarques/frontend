import React, {Component} from 'react'
import Main from '../../template/Main'

import TableCategoria from './TableCategoria'
import Lista from './Lista'

const listaAtual = localStorage.getItem('listSelect')
const headerProps = {
    icon: 'list-alt'
    // title: 'Lista: ' + JSON.parse(listaAtual).nome
}

const initialState = {
    list: []
}
export default class DetalheLista extends Component{
    constructor(props){
        super(props)
        this.state = {...initialState}
    }

    render(){
        return(
            <Main {...headerProps}>
                <Lista></Lista>
                <TableCategoria></TableCategoria>
            </Main>
        )
    }
}