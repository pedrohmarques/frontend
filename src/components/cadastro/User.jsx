import React, { Component } from 'react'
import axios from 'axios'

const baseUrl = 'http://localhost:8080/users/'
const initialState = {
    user: {nome: "", email: "", senha: ""},
    list: []
}
export default class User extends Component{
    state = {...initialState}

    updateField(event){
        const user = {...this.state.user}
        user[event.target.name] = event.target.value
        this.setState({user})
    }

    render(){
        return(
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-12 d-flex">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text" className="form-control"
                                name="nome"
                                value={this.state.user.nome}
                                onChange={e=>this.updateField(e)}
                                placeholder="Digite o nome..." />
                        </div>
                    </div>
                    
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
                        <button className="btn btn-primary" onClick={e=>this.userLogin(e)}>Cadastrar</button>
                        <button className="btn btn-secondary ml-2" onClick={this.props.history.push('/login')}>Voltar</button>
                    </div>
                </div>
            </div>
        )
    }
}