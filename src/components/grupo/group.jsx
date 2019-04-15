import React, {Component} from 'react'
import axios from 'axios'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications'

import Main from '../template/Main'
import NewGroup from './NewGroup'

const url = 'https://will-list.herokuapp.com'
const headerProps = {
    icon: 'list-alt',
    title: 'Lista de Grupos'
}
const initialState = {
    dadosGrupo: {
        nome: ""
    },
    groups: []
}
export default class Group extends Component{

    constructor(props){
        super(props)
        this.state= {...initialState}

        this.componentWillMount = this.componentWillMount.bind(this)
        this.renderRows = this.renderRows.bind(this)
        this.getUpdateGroup = this.getUpdateGroup.bind(this)
        this.createGroup = this.createGroup.bind(this)
        this.updateField = this.updateField.bind(this)
        this.deleteGroup = this.deleteGroup.bind(this)
    }

    componentWillMount(){
        const user = localStorage.getItem('USER')
        axios(`${url}/users/${JSON.parse(user).id}/groups/`).then(resp=>{
            this.setState({ groups: resp.data })
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }
    
    renderRows(){
        return this.state.groups.map(group => {
            return(
                <tr key={group.id}>
                    <td>{group.nome}</td>
                    <td>{group.criador.nome}</td>
                    <td>
                        <button className="btn btn-danger" onClick={e => this.deleteGroup(group.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    getUpdateGroup(group, add=true){
        var groupUpdate = this.state.groups
        
        if(add) {
            groupUpdate.unshift(group)
        }else{
            groupUpdate.splice(groupUpdate.findIndex(e => e.id === group.id),1)
        }
        
        return groupUpdate
    }

    updateField(event){
        const dados = {...this.state.dadosGrupo}
        dados[event.target.name] = event.target.value
        this.setState({dadosGrupo: dados})
    }

    createGroup(){
        const storage = localStorage.getItem('USER')
        const group = {
            idCriador: JSON.parse(storage).id,
            nome: this.state.dadosGrupo.nome
        }
        $.post(`${url}/groups/`, group).then(resp =>{
            NotificationManager.success("Grupo criado com sucesso!")
            const groupUpdate = this.getUpdateGroup(resp)
            this.setState({groups: groupUpdate})
        },error =>{
            NotificationManager.error(error.response.data.message)
        })
    }

    deleteGroup(groupId){
        const user = localStorage.getItem('USER')
        const del = {
            eraserUserId: JSON.parse(user).id 
        }
        
        axios.delete(`${url}/groups/${groupId}`, del).then(resp => {
            NotificationManager.success('Deletado com sucesso!')
            const groupUpdate = this.getUpdateGroup(resp.data, false)
            this.setState({groups: groupUpdate})
        },error =>{
            NotificationManager.error(error.response.data.message)
        })
    }

    render(){
        return(
            <Main {...headerProps}>
                <NewGroup
                    dadosGrupo={this.state.dadosGrupo}
                    updateField={this.updateField}
                    createGroup={this.createGroup}
                ></NewGroup>
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Grupo</th>
                            <th scope="col">Criador</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows()}
                    </tbody>
                </table>
            </Main>
        )
    }
}