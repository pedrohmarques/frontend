import React, {Component} from 'react'
import Main from '../../template/Main'

import TableCategoria from './TableCategoria'

const headerProps = {
    icon: 'list-alt',
    title: 'Detalhe de Lista'
}

const initialState = {
    list: []
}
export default class DetalheLista extends Component{
    constructor(props){
        super(props)
        this.state = {...initialState}
    }

    renderTableCategoria(){
        
    }

    render(){
        return(
            <Main {...headerProps}>
                <TableCategoria></TableCategoria>
            </Main>
        )
    }
}