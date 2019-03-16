import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

import NewList from './NewList'
import './ListaCrud.css'

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

    renderList(){
        console.log(this.state.list)
        return this.state.list.map(grupo =>{
            return grupo.listasDeCompras.map(listas => {
                return grupo.usuarios.map(users =>{
                    return(
                        <div className="container">
                            <div className="container-bola"> </div>
                            <ul className="list-group" key={grupo.id}>
                                <li id="nomeLista" className="list-group-item">{listas.nome}</li>
                                <li className="integrantes">{users.usuario.nome}</li>
                            </ul>
                        </div>
                    )
                })
            })
        })
    }


    render(){
        return(
            <Main {...headerProps}>
                <NewList></NewList>
                {this.renderList()}
            </Main>
        )
    }
}