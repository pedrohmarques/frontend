import React, {Component} from 'react'
import '../css/TableCategorias.css'
import FieldEdit from  './FieldEdit'
import axios from 'axios';
import {NotificationManager} from 'react-notifications';

export default class TableCategorias extends Component{
    constructor(props) {
        super(props)
        this.state = { data:[]}
        this.updateCategoria = this.updateCategoria.bind(this)
        this.listCategorias = this.listCategorias.bind(this)
        this.listCategorias()
     }

    listCategorias (){
        axios.get(this.props.baseUrl+"categories/").then(function(callback){
            this.setState({data : callback.data})
        }.bind(this)).catch(function(response){
            console.log(response)
        });
    };

    deleteCategoria(categoria){
            axios.delete(this.props.baseUrl + "categories/" + categoria.id,
            {
                headers: {'Access-Control-Allow-Origin': '*'}
            }).then(function(callback){
                NotificationManager.success('Categoria excluida com sucesso.','',2000)
                this.listCategorias()
            }.bind(this));
    };

    updateCategoria(categoria){
        axios.put(this.props.baseUrl+"categories/"+ categoria.id+'?nome='+categoria.nome).then(function(callback){
            NotificationManager.success('Categoria atualizada com sucesso.','',2000)
            this.listCategorias()
        }.bind(this));
    };
    
    renderRows(){
        return this.state.data.map(categoria=>(
                <tr key={categoria.id}>
                    <td>{categoria.nome}</td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                    <FieldEdit categoria={categoria} updateCategoria = {this.updateCategoria}/>
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