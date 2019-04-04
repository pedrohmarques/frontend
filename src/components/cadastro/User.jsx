import React, { Component } from 'react'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications';

import UserForm from './UserForm'

const baseUrl = 'https://will-list.herokuapp.com/'
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
        const valid = this.validacaoDeCampos(user)
        if(valid){
            $.post(`${baseUrl}/users/`, user ).then(resp=>{
                if(resp.id){
                    NotificationManager.success('Cadastrado com sucesso!')
                    this.props.history.push('/')
                }
            },error=>{
                NotificationManager.error(error.response.data.message)
            })
        }
    }
    validacaoDeCampos(user){
        if(/[0-9]/g.test(user.nome)){
            NotificationManager.warning('Campo nome pode haver apenas letras.') 
            return false
        }

        if(user.email === "" || user.email.indexOf('@') === -1 
        || user.email.indexOf('.') === -1 ){
            NotificationManager.warning("Por favor, informe um E-mail válido!");
            return false;
        }

        return true
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