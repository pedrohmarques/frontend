import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications'

import NewList from './NewList'
import AlteraProdutoPopup from './AlteraProdutoPopup'
import './ListaCrud.css'

const headerProps = {
    icon: 'list-alt',
    title: 'Lista de Compras'
}

const listGroup = 'https://will-list.herokuapp.com'
const initialState = {
    dadoLista: {nome: "",},
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
        this.createList = this.createList.bind(this)
        this.getUpdateList = this.getUpdateList.bind(this)
        this.getUpdateListInGroup =this.getUpdateListInGroup.bind(this)
    }
    
    componentWillMount(){
        const user = localStorage.getItem('USER')
        axios(`${listGroup}/users/${JSON.parse(user).id}/groups/`).then(resp=>{
            this.setState({ list: resp.data })
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }

    updateField(event){
        const dados = {...this.state.dadoLista}
        dados[event.target.name] = event.target.value
        this.setState({dadoLista: dados})
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
                                dadoLista={this.state.dadoLista}
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
        if(localStorage.getItem('listSelect') != null && localStorage.getItem('usuarios')){
            localStorage.removeItem('listSelect');
            localStorage.removeItem('usuarios');
            localStorage.removeItem('group-id')
        }
        
        localStorage.setItem('listSelect', JSON.stringify(lista))
        localStorage.setItem('usuarios', JSON.stringify(grupo.usuarios))
        localStorage.setItem('group-id', grupo.id)
        this.props.history.push('/viewlist') 
    }

    getUpdateList(lista, add=true){
        var listUpdate = this.state.list
        for(var posicao in listUpdate){
            listUpdate[posicao].listasDeCompras = listUpdate[posicao].listasDeCompras.filter(u => u.id == lista.id)
        }
        if(add) listUpdate.unshift(lista)
        return listUpdate
    }
    
    getUpdateListInGroup(group, lista, add=true){
        var listUpdate = this.state.list
        var pos = 0
        for(var posicao in listUpdate){
            if(listUpdate[posicao].id == group){
                pos = posicao
            }
        }
        if(add) listUpdate[pos].listasDeCompras.unshift(lista)
        return listUpdate
    }

    delete(lista){
        axios.delete(`${listGroup}/lists/${lista.id}`).
            then(resp =>{
                NotificationManager.success("Lista excluida com sucesso!")
                const list = this.getUpdateList(lista, false)
                this.state.setState({list})
            }, error=>{
                NotificationManager.error(error.response.data.message)
            })
    }

    update(lista){
        const nome = {
            listName: this.state.dadoLista.nome
        }
        axios.put(`${listGroup}/lists/${lista.id}?listName=${nome.listName}`, '').
            then(resp => {
                NotificationManager.success("Lista atualizada com sucesso!")
            },error=>{
                NotificationManager.error(error.response.data.message)
            })
    }

    createList(groupId){
        const list = {
            groupId: groupId,
            nome: this.state.dadoLista.nome
        }
        $.post(`${listGroup}/lists/`, list).then(resp =>{
            NotificationManager.success("Lista criada com sucesso!")
            const listUpdate = this.getUpdateListInGroup(groupId, resp)
            this.setState({list: listUpdate})
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                <NewList
                    dadoLista={this.state.dadoLista}
                    list = {this.state.list}
                    updateField={this.updateField}
                    createList={this.createList}
                ></NewList>
                {this.renderList()}
            </Main>
        )
    }
}