import React, { Component } from 'react'
import axios from 'axios'

import Popup from "reactjs-popup";
import Input from "../input/Input"
import InputImg from "../input/InputImg"
import '../input/Input.css'

export default class AlteraProdutoPopup extends Component{
    constructor(props) {
        super(props)
        this.state = { open: false, dadosProduto: {nome: ''}, products: []}
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.updateField = this.updateField.bind(this)
        this.getProduct = this.getProduct.bind(this)
        this.renderProduct = this.renderProduct.bind(this)
        this.renderTableProduct = this.renderTableProduct.bind(this)
      }
      openModal (){
        this.setState({ open: true })
      }
        closeModal () {
            this.setState({ open: false })
        }

    updateField(event){
        const dados = {...this.state.dadosProduto}
        dados[event.target.name] = event.target.value
        this.setState({dadosProduto: dados})
    }

    getProduct(e){
        this.updateField(e)
        axios(`${this.props.URL}/products/recommended/?nomeProduto=${e.target.value}`).then(resp => {
            this.setState({products: resp.data})
        })
    }

    renderProduct(){
        return this.state.products.map(product => {
            return(
                <tr key={product.id}>
                    <td>
                        {product.nome}
                    </td>
                    <td>
                        {product.preco}
                    </td>
                    <td>
                        <button className="btn btn-primary" onClick={e => this.props.createProductInList(product.id)}>
                            <i className="fa fa-plus"></i>
                        </button>
                    </td>
                </tr>
                
            )
        })
    }

    renderTableProduct(){
        if(this.state.products.length > 0){
            return(
                <table className="table">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Produto</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Ação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderProduct()}
                    </tbody>
                </table>
            )
        }
    }
    add(){
        
        this.closeModal()
    }
    render(){
        return(
        <div>
            <button className="btn btn-primary btn-sm" onClick={this.openModal}>
                <i className="fa fa-plus ml-2"></i> Novo Produto
            </button>
            <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}>
                <div className="popup">
                    <div className="header"> <h5>Adicionar Produto</h5> </div>
                    <div className="content col-xs-4">
                        <Input id="produto" description="Produto" placeholder="Suco de Laranja"
                        name="nome" value={this.state.dadosProduto.nome}
                        onChange={e=> this.getProduct(e)}
                        ></Input>
                        {this.renderTableProduct()}
                    </div>
                    <a className="close" onClick={this.closeModal}>
                        &times;
                    </a>
                </div>
            </Popup>
        </div>
        )
    }
}