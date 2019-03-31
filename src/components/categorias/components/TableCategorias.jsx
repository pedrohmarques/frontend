import React, {Component} from 'react'
//import axios from 'axios'
import '../css/TableCategorias.css'
import FieldEdit from  './FieldEdit'
import axios from 'axios';

const baseUrl = "https://will-list.herokuapp.com/";

export default class TableCategorias extends Component{
    constructor(props) {
        super(props)
        this.state = { data:[]}
        this.listCategorias()
      }

    listCategorias (){
        axios.get(baseUrl+"categories/").then(function(callback){
            this.setState({data : callback.data})
        }.bind(this)).catch(function(response){
            console.log(response)
        });
    };

    deleteCategoria(categoria){
        // axios.post(url+"categories/"+categoria.id).then(function(callback){
        //     this.forceUpdate();
        // });
    };
    renderRows(){
        return this.state.data.map(categoria=>(
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