import React, { Component } from 'react'
import axios from 'axios'

import './Login.css'

const baseUrl = 'http://localhost:8080/users/login'
const initialState = {
    user: {email: "", senha: ""},
    list: []
}

export default class Login extends Component
{
    state = {...initialState}

    userLogin(){
        const user = this.state.user
        this.props.history.push('/home')
        // axios.post(baseUrl, user)
        //     .then(resp =>{
        //         console.log(resp.data)
        //     })
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
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text" className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e=>this.updateField(e)}
                                placeholder="Digite o email..." />
                        </div>
                    </div>

                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>Senha</label>
                            <input type="password" className="form-control"
                                name="senha"
                                value={this.state.user.senha}
                                onChange={e=>this.updateField(e)}
                                placeholder="Digite a senha..." />
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={e=>this.userLogin(e)}>Salvar</button>
                        <button className="btn btn-secondary ml-2" onClick={e=>this.redirectCadastro(e)}>Cadastrar</button>
                    </div>
                </div>
        </div> 
        )
    }
}
    
