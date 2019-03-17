import React, { Component } from 'react'
import axios from 'axios'

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
        axios.post(baseUrl, user)
            .then(resp => {
                console.log(resp.data)
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