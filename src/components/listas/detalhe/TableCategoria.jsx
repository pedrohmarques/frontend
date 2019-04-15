import React, {Component} from 'react'
import axios from 'axios'

import FieldAdd from './FieldAddProduto'
import { NotificationManager } from 'react-notifications';

const URL = 'https://will-list.herokuapp.com'
const initialState = {

    categories: [],
    products: []
}
export default class TableCategoria extends Component{

    constructor(props){
        super(props)
        this.state = {...initialState}
        this.componentWillMount = this.componentWillMount.bind(this)
        this.renderTable = this.renderTable.bind(this)
        this.createProductInList = this.createProductInList.bind(this)
    }

    componentWillMount(){
        const list = localStorage.getItem('listSelect')
        axios(`${URL}/lists/${JSON.parse(list).id}/categories`).then(
            resp => {
                this.setState({ categories: resp.data })     
            }
        )
    }

    createProductInList(productId){
        const listSelect = localStorage.getItem('listSelect')
        axios.put(`${URL}/lists/${JSON.parse(listSelect).id}/products/${productId}`).then(resp => {
            NotificationManager.success('Produto adicionado com sucesso!')
        },error => {
            NotificationManager.error(error.response.data.message)
        })
    }

    removeProductList(productId){
        const listSelect = localStorage.getItem('listSelect')
        axios.delete(`${URL}/lists/${JSON.parse(listSelect).id}/products/${productId}`).then(resp=>{
            NotificationManager.success('Deletado com sucesso!')
            // const categoriesUpdate = resp.data
            // this.setState({categories: categoriesUpdate})
        },error => {
            NotificationManager.error(error.response.data.message)
        })
    }

    renderProduct(produtos){
        return produtos.map(produto => {
            return(
                <tr key={produto.id}>
                    <td>{produto.nome}</td>
                    <td>{produto.preco}</td>
                    <td>
                        <button className="btn btn-danger" onClick={e => this.removeProductList(produto.id)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    renderTable(){
        return this.state.categories.map(categoria =>{
            return(
                <table className="table">
                    <thead className="thead-dark">
                        <tr key={categoria.id}>
                            <th scope="col">{categoria.nome}</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProduct(categoria.produtos)}
                    </tbody>
                </table>
            )
        }) 
    }

    render(){
        return(
           <div>
               <FieldAdd URL={URL} createProductInList={this.createProductInList}></FieldAdd>
               {this.renderTable()}
           </div>
        )
    }

}