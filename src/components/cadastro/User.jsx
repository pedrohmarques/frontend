import React, { Component } from 'react'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications';

import UserForm from './UserForm'

const baseUrl = 'http://localhost:8080/users/'
const initialState = {
    user: {nome: "", email: "", senha: ""},
    list: []
}
export default class User extends Component{
    constructor(props){
        super(props)
        this.state = {...initialState}
        this.updateField = this.updateField.bind(this)
        this.cadastro = this.cadastro.bind(this)
        this.backLogin = this.backLogin.bind(this)
    }

    cadastro(){
        const user = this.state.user;
        $.post( baseUrl, user ).then(resp=>{
            if(resp.id){
                NotificationManager.success('Cadastrado com sucesso!')
                this.props.history.push('/')
            }
        },error=>{
            NotificationManager.error(error.responseJSON.message)
        })
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    backLogin(){
        this.props.history.push('/')
    }

    render(){
        return(
           <UserForm user={this.state.user}
           updateField={this.updateField}
           cadastro={this.cadastro}
           backLogin={this.backLogin}></UserForm> 
        )
    }
}