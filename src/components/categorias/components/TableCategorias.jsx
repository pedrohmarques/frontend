import React, {Component} from 'react'
//import axios from 'axios'
import '../css/TableCategorias.css'
import FieldEdit from  './FieldEdit'
import axios from 'axios';

const url = "https://will-list.herokuapp.com/";
var categorias = [
    {
        "id": 7,
        "nome": "Alimentos"
    },
    {
      "id": 1,
      "nome": "Limpeza"
    }
  ];

export default class TableCategorias extends Component{
    constructor(props) {
        super(props)
        this.listCategorias = this.listCategorias.bind(this)
      }

    listCategorias (){
        // this.categorias = axios.get(url+"categories");
    };

    deleteCategoria(categoria){
        // axios.post(url+"categories/"+categoria.id).then(function(callback){
        //     this.forceUpdate();
        // });
    };
    renderRows(){
        return categorias.map(categoria=>(
                <tr key={categoria.id}>
                    <td>{categoria.nome}</td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                    <FieldEdit categoria={categoria}/>
                    <button type="button" className="btn btn-warning d-inline ml-2" onClick={(e) => this.deleteCategoria(categoria, e)}> <i className="fa fa-trash"/></button>
                    </td>
                </tr>
            )
        )
    }

    render(){
        {this.listCategorias()}
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
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