import React, { Component } from 'react'
import Main from '../template/Main'
import axios from 'axios'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications';

import NewGroup from './NewGroup'
import NewList from './NewList'
import AlteraProdutoPopup from './AlteraProdutoPopup'
import './ListaCrud.css'

const headerProps = {
    icon: 'list-alt',
    title: 'Lista de Compras'
}

const listGroup = 'https://will-list.herokuapp.com'
const initialState = {
    user: {nome: "",},
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
        this.createGroup = this.createGroup.bind(this)
        this.createList = this.createList.bind(this)
    }
    
    componentWillMount(){
        const user = localStorage.getItem('USER')
        axios(`${listGroup}/users/${JSON.parse(user).id}/groups/`).then(resp=>{
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
            listUpdate[posicao].listasDeCompras = listUpdate[posicao].listasDeCompras.filter(u => u.id !== lista.id)
        }
        if(add) listUpdate.unshift(lista)
        return listUpdate
    }

    getUpdateGroup(group, add=true){
        var groupUpdate = this.state.list
        
        if(add) groupUpdate.unshift(group)
        return groupUpdate
    }

    delete(lista){
        axios.delete(`${listGroup}/lists/${lista.id}`).
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
        axios.put(`${listGroup}/lists/${lista.id}`, JSON.stringify(nome)).
            then(resp => {
                NotificationManager.success("Lista atualizada com sucesso!") 
                // const listUpdate = this.getUpdateList(resp.data)
                // this.setState({list: initialState.list, listUpdate})
                return 'ok'
            })
    }

    createGroup(){
        const storage = localStorage.getItem('USER')
        const group = {
            idCriador: JSON.parse(storage).id,
            nome: this.state.user.nome
        }
        $.post(`${listGroup}/groups/`, group).then(resp =>{
            NotificationManager.success("Grupo criado com sucesso!")
            const groupUpdate = this.getUpdateGroup(resp)
            this.state.setState({groupUpdate})
        })
    }

    createList(groupId){
        const list = {
            groupId: groupId,
            nome: this.state.user.nome
        }
        $.post(`${listGroup}/lists/`, list).then(resp =>{
            NotificationManager.success("Lista criada com sucesso!")
            const listUpdate = this.getUpdateList(resp)
            this.setState({listUpdate})
        })
    }

    render(){
        return(
            <Main {...headerProps}>
               <NewGroup
                    state={this}
                    updateField={this.updateField}
                    createGroup={this.createGroup}
                ></NewGroup>
                <NewList
                    state={this}
                    updateField={this.updateField}
                    createList={this.createList}
                ></NewList>
                {this.renderList()}
            </Main>
        )
    }
}