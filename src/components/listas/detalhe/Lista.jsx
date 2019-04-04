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
            usuarios: []
        }

        this.addUserInGroup = this.addUserInGroup.bind(this)
        this.updateField = this.updateField.bind(this)
        this.componentWillMount = this.componentWillMount.bind(this)
        this.addUsuarioInList = this.addUsuarioInList.bind(this)
    }

    componentWillMount(){
        axios(`${url}/groups/${parseInt(localStorage.getItem('group-id'))}/`).then(resp=>{
            this.setState({ usuarios: resp.data.usuarios})
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

    addUsuarioInList(usuario){
        var usuariosUpdate = this.state.usuarios
        usuariosUpdate.unshift(usuario)
        return usuariosUpdate
    }

    renderRows(){
        return this.state.usuarios.map(usuario =>{
            return(
                <tr key={usuario.usuario.id}>
                    <td>
                        {usuario.usuario.nome}
                    </td>
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