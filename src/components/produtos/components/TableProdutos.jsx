import React, {Component} from 'react'
//import axios from 'axios'
import '../css/TableProdutos.css'
import FieldEdit from  './FieldEdit'

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
    
    listProdutos (){
        // this.produtos = axios({
        //     url: url+'lists/',
        //     method: 'get'
        //   });
    };
    renderRows(){
        return produtos.map(produto=>(
            <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.preco}</td>
                <td>{produto.categoria.nome}</td>
                <td className="text-center">
                <FieldEdit preco={produto.preco} produtoNome={produto.nome} produtoId ={produto.id} categoriaNome ={produto.categoria.nome} categoriaId={produto.categoria.id}/>
               <button className="btn btn-warning ml-2">
                    <i className="fa fa-trash"></i>
               </button>
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