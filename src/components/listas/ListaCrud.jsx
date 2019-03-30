import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';

import NewList from './NewList'
import Detalhe from './detalhe/DetalheLista'
import './ListaCrud.css'

const headerProps = {
    icon: 'list-alt',
    title: 'Lista de Compras'
}

const listGroup = 'http://localhost:8080/users'
const listaUrl = 'http://localhost:8080/lists'
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
        const user = localStorage.getItem('USER')
        // const userId = 9
        axios(`${listGroup}/${JSON.parse(user).id}/groups`).then(resp=>{
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
                            <button className="btn btn-warning">
                                <i className="fa fa-pencil"></i>
                            </button>
                            <button className="btn btn-danger ml-2" onClick={e=>this.delete(lista)}>
                                <i className="fa fa-trash"></i>
                            </button>
                            <button className="btn btn-warning ml-2" onClick={e=>this.redirectView(lista)}>
                                <i className="fa fa-list-alt"></i>
                            </button>
                        </td>
                    </tr>
                )
            })
        })
    }

    redirectView(lista){
        localStorage.setItem('listSelect', JSON.stringify(lista))
        this.props.history.push('/viewlist') 
    }

    getUpdateList(lista, add=true){
        var listUpdate = this.state.list
        for(var posicao in listUpdate){
            listUpdate[posicao].listasDeCompras = listUpdate[posicao].listasDeCompras.filter(u => u.id !== lista.id)
        }

        if(add) listUpdate.unshift(lista)
        return listUpdate
    }

    delete(lista){
        axios.delete(`${listaUrl}/${lista.id}`).
            then(resp =>{
                NotificationManager.success("Lista excluida com sucesso!")
                const list = this.getUpdateList(lista, false)
                this.setState({list})
            }, error=>{
                NotificationManager.error(error.responseJSON.message)
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