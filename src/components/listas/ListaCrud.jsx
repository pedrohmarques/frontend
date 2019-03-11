import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

import NewList from './NewList'

const headerProps = {
    icon: 'list-alt',
    title: 'Lista de Compras'
}

const listGroup = 'http://localhost:8080/users'
const initialState = {
    list: []
}

export default class ListaCrud extends Component {
    state = {...initialState}
    
    componentWillMount(){
        axios(`${listGroup}/9/groups`).then(resp=>{
            this.setState({ list: resp.data })
        })
    }

    render(){
        console.log(this.state.list)
        return(
            <Main {...headerProps}>
                <NewList></NewList>
            </Main>
        )
    }
}