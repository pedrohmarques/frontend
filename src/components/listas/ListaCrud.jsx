import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'

import NewList from './NewList'
import Detalhe from './detalhe/DetalheLista'
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
    constructor(props){
        super(props)
        this.state = {...initialState}
        this.componentWillMount = this.componentWillMount.bind(this)
        this.renderList = this.renderList.bind(this)
        this.renderRows = this.renderRows.bind(this)
        this.redirectView = this.redirectView.bind(this)
    }
    
    componentWillMount(){
        const userId = localStorage.getItem('USER-ID')
        // const userId = 9
        axios(`${listGroup}/${userId}/groups`).then(resp=>{
            this.setState({ list: resp.data })
        })
    }

    renderList(){
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Lista</th>
                        <th scope="col">Criador</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        
        return this.state.list.map(grupo=>{
            return grupo.listasDeCompras.map(lista => {
                return (
                    <tr key={lista.id}>
                        <td>{lista.nome}</td>
                        <td>{grupo.criador.nome}</td>
                        <td>
                            <button className="btn btn-warning" onClick={e=>this.redirectView(lista.id)}>
                                <i className="fa fa-pencil"></i>
                            </button>
                        </td>
                    </tr>
                )
            })
        })
    }

    redirectView(listaId){
        localStorage.setItem('listSelect', listaId)
        this.props.history.push('/viewlist') 
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