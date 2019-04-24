import React, {Component} from 'react'
import axios from 'axios'
import {NotificationManager} from 'react-notifications'

import FieldAdd from './FieldAddUser'
const url = 'https://will-list.herokuapp.com'

export default class Lista extends Component{

    constructor(props){
        super(props)
        this.state = {
            user:{
                email: ""
            },
            usuarios: [],
            criador: []
        }

        this.addUserInGroup = this.addUserInGroup.bind(this)
        this.updateField = this.updateField.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.addUsuarioInList = this.addUsuarioInList.bind(this)
        this.removeUserGroup = this.removeUserGroup.bind(this)
    }

    componentWillMount(){
        axios(`${url}/groups/${parseInt(localStorage.getItem('group-id'))}/`).then(resp=>{
            this.setState({ usuarios: resp.data.usuarios})
            this.setState({ criador: resp.data.criador})
        })
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    addUserInGroup(){
        axios.put(`${url}/groups/${parseInt(localStorage.getItem('group-id'))}/?userEmail=${this.state.user.email}`, '').then(resp =>{
            NotificationManager.success('Usuário adicionado com sucesso!')
            const userUpdate = resp.data.usuarios
            this.setState({usuarios: userUpdate})
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }

    removeUserGroup(userId){
        const groupId = parseInt(localStorage.getItem('group-id'))
        axios.delete(`${url}/groups/${groupId}/user/${userId}`).then(resp =>{
            NotificationManager.success('Usuário excluído com sucesso!')
            const usuariosUpdate = this.addUsuarioInList(resp.data, false)
            this.setState({usuarios: usuariosUpdate})
        },error => {
            NotificationManager.error(error.response.data.message)
        })
    }

    toggleUserAdmin(toggleUser, admin){
        const groupId = parseInt(localStorage.getItem('group-id'))
        if(admin) admin = false
        else admin = true

        axios.put(`${url}/groups/${groupId}/user/${toggleUser}/?admin=${admin}`).then(resp => {
            NotificationManager.success('Usuário modificado com sucesso!')
            this.setState({usuarios: resp.data.usuarios})
        },error => {
            NotificationManager.error(error.response.data.message)
        })
    }

    addUsuarioInList(usuario, add = true){
        var usuariosUpdate = this.state.usuarios

        if(add) usuariosUpdate.unshift(usuario)
        else usuariosUpdate.splice(usuariosUpdate.findIndex(e => e.id === usuario.id),1)
        
        return usuariosUpdate
    }

    adminOrCreator(admin, id){

        if(this.state.criador.id != id){
            return(
                <td>
                    <button className="btn btn-danger" onClick={e => this.removeUserGroup(id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <button className="btn btn-danger ml-2" onClick={e => this.toggleUserAdmin(id, admin)}>
                        <i className="fa fa-star"></i>
                    </button>
                </td>
            )
        }else{
            return(
                <td>
                    
                </td>
            )
        }
    }

    renderRows(){
        return this.state.usuarios.map(usuario =>{
            var star = ""
            if(usuario.admin) star = <i className="fa fa-star"></i>
            else star = ''

            return(
                <tr key={usuario.usuario.id}>
                    <td>
                        {usuario.usuario.nome} {star}
                    </td>
                    {this.adminOrCreator(usuario.admin, usuario.usuario.id)}
                </tr>
            )
        })
    }
    
    render(){
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Integrantes</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
                <tfoot>
                    <FieldAdd
                        email={this.state.user.email}
                        updateField={this.updateField}
                        addUserInGroup={this.addUserInGroup}
                    ></FieldAdd>
                </tfoot>
            </table>
        )
    }
}