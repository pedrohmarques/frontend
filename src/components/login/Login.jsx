import React, { Component } from 'react'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications';

import './Login.css'
import {login, logout} from '../services/auth'
import LoginForm from './loginForm'

const baseUrl = 'http://localhost:8080/users/login'
const initialState = {
    user: {email: "", senha: ""},
    list: []
}

export default class Login extends Component
{
    constructor(props){
        super(props)
        logout()
        this.state = {...initialState}
        this.userLogin = this.userLogin.bind(this)
        this.updateField = this.updateField.bind(this)
        this.redirectCadastro = this.redirectCadastro.bind(this)
    }

    userLogin(){
        const user = this.state.user
        const valid = this.validacaoDeCampos(user)
        if(valid){
            $.post(baseUrl, user).then(resp =>{
                if(resp.id){
                    login(resp.id)
                    this.props.history.push('/home')  
                }
                    
            },error=>{
                NotificationManager.error(error.responseJSON.message);
            })
        }
    }
    
    validacaoDeCampos(user){
        if(user.email === "" || user.email.indexOf('@')=== -1 
        || user.email.indexOf('.') === -1 ){
            NotificationManager.warning("Por favor, informe um E-mail válido!");
            return false;
        }
        
        if(user.senha.length <= 0){
            NotificationManager.warning('Digite a senha.')
            return false
        }
        return true
    }

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    redirectCadastro(){
        this.props.history.push('/users')
    }

    render(){
        return(
            <div className="container">
                <LoginForm 
                    user={this.state.user}
                    userLogin={this.userLogin}
                    updateField={this.updateField}
                    redirectCadastro={this.redirectCadastro}>
                </LoginForm>
            </div>
        )
    }
}
    
