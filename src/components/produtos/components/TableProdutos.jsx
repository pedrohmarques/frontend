import React, {Component} from 'react'
//import axios from 'axios'
import '../css/TableProdutos.css'
import FieldEdit from  './FieldEdit'
import axios from 'axios';

const baseUrl = "https://will-list.herokuapp.com/";

export default class TableProdutos extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data : []
        }
        this.listProdutos()
      }

    listProdutos (){
        axios.get(baseUrl+"categories/2").then(function(callback){
            this.setState({data : callback.data})
        }.bind(this)).catch(function(response){
            console.log(response)
        });
     };

    deleteProduto(produto){
        // axios.post(url+"products/"+produto.id).then(function(callback){
        //     this.forceUpdate();
        // }.bind(this));
    };
    renderRows(){
        return this.state.data.map(produto=>(
            <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.categoria.nome}</td>
                <td className="text-center">
                <FieldEdit produto={produto}/>
                <button type="button" className="btn btn-warning d-inline ml-2" onClick={(e) => this.deleteProduto(produto, e)}> <i className="fa fa-trash"/></button>
                </td>
            </tr>
        )
        )
    }

    render(){
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Preço</th>
                        <th scope="col" >Categoria</th>
                        <th scope="col" className="text-center">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

}