import React, {Component} from 'react'
import axios from 'axios'

export default class Lista extends Component{
    renderRows(){
        const usuarios = localStorage.getItem('usuarios')
        return JSON.parse(usuarios).map(usuario =>{
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
            </table>
        )
    }
}