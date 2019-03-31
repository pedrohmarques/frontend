import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import {NotificationManager} from 'react-notifications';

import NewList from './NewList'
import AlteraProdutoPopup from './AlteraProdutoPopup'
import Detalhe from './detalhe/DetalheLista'
import './ListaCrud.css'

const headerProps = {
    icon: 'list-alt',
    title: 'Lista de Compras'
}

const listGroup = 'http://localhost:8080/users'
const listaUrl = 'http://localhost:8080/lists'
const initialState = {
    user: {nome: ""},
    list: []
}

export default class ListaCrud extends Component {
    constructor(props){
        super(props)
        this.state = {...initialState}
        this.componentWillMount = this.componentWillMount.bind(this)
        this.renderList = this.renderList.bind(this)
        this.renderRows = this.renderRows.bind(this)
        this.redirectView = this.redirectView.bind(this)
        this.updateField = this.updateField.bind(this)
    }
    
    componentWillMount(){
        const user = localStorage.getItem('USER')
        // const userId = 9
        axios(`${listGroup}/${JSON.parse(user).id}/groups`).then(resp=>{
            this.setState({ list: resp.data })
        })
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
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
                            <AlteraProdutoPopup 
                                lista={lista}
                                user={this.state.user}
                                state={this}
                                update={this.update}
                                updateField={this.updateField}
                                delete = {this.delete}
                                redirectView = {this.redirectView}
                                getUpdateList={this.getUpdateList}
                                grupo={grupo}
                            ></AlteraProdutoPopup>
                            
                        </td>
                    </tr>
                )
            })
        })
    }

    redirectView(lista, grupo){
        localStorage.setItem('listSelect', JSON.stringify(lista))
        localStorage.setItem('usuarios', JSON.stringify(grupo.usuarios))
        this.props.history.push('/viewlist') 
    }

    getUpdateList(lista, add=true){
        var listUpdate = this.state.state.list
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
                this.state.setState({list})
            }, error=>{
                NotificationManager.error(error.responseJSON.message)
            })
    }

    update(lista){
        const nome = {listName: this.user.nome}
        axios.put(`${listaUrl}/${lista.id}`, JSON.stringify(nome)).
            then(resp => {
                NotificationManager.success("Lista atualizada com sucesso!") 
                // const listUpdate = this.getUpdateList(resp.data)
                // this.setState({list: initialState.list, listUpdate})
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