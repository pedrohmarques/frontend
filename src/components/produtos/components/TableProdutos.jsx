import React, {Component} from 'react'
//import axios from 'axios'
import '../css/TableProdutos.css'
import FieldEdit from  './FieldEdit'
import axios from 'axios';

const url = "https://will-list.herokuapp.com/";
var produtos = [
    {
      "id": 3,
      "nome": "Biscoito Club Social",
      "preco": 4,
      "categoria": {
        "id": 2,
        "nome": "Lanches"
      }
    },
    {
      "id": 1,
      "nome": "Água",
      "preco": 2,
      "categoria": {
        "id": 1,
        "nome": "Bebidas"
      }
    }
  ];

export default class TableProdutos extends Component{
    constructor(props) {
        super(props)
        this.listProdutos = this.listProdutos.bind(this)
      }

    listProdutos (){
        // this.produtos = axios.get(url+"products");
    };

    deleteProduto(produto){
        // axios.post(url+"products/"+produto.id).then(function(callback){
        //     this.forceUpdate();
        // });
    };
    renderRows(){
        return produtos.map(produto=>(
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
        {this.listProdutos()}
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