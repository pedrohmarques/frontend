import React, {Component} from 'react'
import axios from 'axios'

export default class TableCategoria extends Component{
    renderRows(){
        
        return('')
        // return this.state.list.map(grupo=>{
        //     return grupo.listasDeCompras.map(lista => {
        //         return (
        //             // <tr key={lista.id}>
        //             //     <td>{lista.nome}</td>
        //             //     <td>{grupo.criador.nome}</td>
        //             //     <td>
        //             //         <button className="btn btn-warning" onClick={e=>this.redirectView(lista.id)}>
        //             //             <i className="fa fa-pencil"></i>
        //             //         </button>
        //             //     </td>
        //             // </tr>
        //             '2'
        //         )
        //     })
        // })
    }

    render(){
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Categoria</th>
                        <th scope="col">Valor</th>
                        <th scope="col">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

}