import React, {Component} from 'react'
import '../css/TableProdutos.css'
import FieldEdit from  './FieldEdit'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

export default class TableProdutos extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            data : []
        }
        this.listProdutos =this.listProdutos.bind(this)
        this.listProdutos()
      }

    listProdutos (){
        axios.get(this.props.baseUrl+"categories/").then(function(callback){
            this.setState({data : callback.data})
        }.bind(this)).catch(function(response){
            console.log(response)
        });
     };

    deleteProduto(produto){
        axios.delete(this.props.baseUrl+"products/"+produto.id).then(function(callback){
            NotificationManager.warning('Produto excluido.','',2000)
            this.listProdutos();
        }.bind(this));
    };

    updateProduto(produto){
        axios.put(this.props.baseUrl+"products/"+ produto.id+'?nome='+produto.nome+'preco='+produto.preco+'idCategoria='+produto.idCategoria, {
               //nome: produto.nome
            //    preco: produto.preco,
            //    idCategoria : produto.idCategoria
        }).then(function(callback){
            NotificationManager.success('Produto atualizado.','',2000)
            this.listProdutos()
        }.bind(this));
    };

    renderRows(){
        return this.state.data.map(categoria=>(
                categoria.produtos.map(produto=>(
                    <tr key={produto.id}>
                        <td>{produto.nome}</td>
                        <td>{produto.preco}</td>
                        <td>{categoria.nome}</td>
                        <td className="text-center">
                        <FieldEdit produto={produto} categoria={categoria}/>
                        <button type="button" className="btn btn-warning d-inline ml-2" onClick={(e) => this.deleteProduto(produto, e)}> <i className="fa fa-trash"/></button>
                        </td>
                    </tr>
                )
            )
           
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