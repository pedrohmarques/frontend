import React, { Component } from 'react'
import $ from 'jquery'
import {NotificationManager} from 'react-notifications';

import './Login.css'
import {login, logout} from '../services/auth'
import LoginForm from './loginForm'

const baseUrl = 'https://will-list.herokuapp.com'
const initialState = {
    user: {email: "", senha: ""},
    list: []
}

export default class Login extends Component
{
    constructor(props){
        super(props)
        logout()
        localStorage.clear()
        this.state = {...initialState}
        this.userLogin = this.userLogin.bind(this)
        this.updateField = this.updateField.bind(this)
        this.redirectCadastro = this.redirectCadastro.bind(this)
}

    userLogin(){
        const user = this.state.user
        const valid = this.validacaoDeCampos(user)
        if(valid){
            $.post(`${baseUrl}/users/login`, user).then(resp =>{
                if(resp.id){
                    login(JSON.stringify(resp))
                    this.props.history.push('/home')  
                }
                    
            },error=>{
                NotificationManager.error(error.response.data.message)
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
            
            <LoginForm 
                user={this.state.user}
                userLogin={this.userLogin}
                updateField={this.updateField}
                redirectCadastro={this.redirectCadastro}>
            </LoginForm>
            
        )
    }
}
    
