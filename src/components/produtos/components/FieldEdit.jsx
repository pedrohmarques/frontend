import React from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import InputImg from "./InputImg"
import InputSelect from "./InputSelect"
import axios from 'axios'
import '../css/Input.css'

export default class FieldEdit extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        open: false, 
        nome : '',
        preco: '',
        idCategoria: ''
      }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.changeState = this.changeState.bind(this)
      this.updateProduto = this.updateProduto.bind(this)
    }
    openModal (){
      this.setState({ open: true })
    }
    closeModal () {
      this.setState({ open: false })
    }

    changeState (type, value){
      this.setState({[type]  : value});
    }

    updateProduto(){
      this.props.updateProduto({
        id: this.props.produto.id,
        nome : this.state.nome,
        preco : this.state.preco,
        idCategoria : this.state.idCategoria
      })
      this.closeModal()
    }

    render() {
      return (
        <div className="d-inline">
        <button type="button" className="btn btn-warning" onClick={this.openModal}> <i className="fa fa-pencil"/></button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="popup">
                <div className="header"> <h5>Produto</h5> </div>
                <div className="form-group content col-xs-4">
                    <Input type="text" chave="nome" description="Nome" placeholder={this.props.produto.nome} changeState={this.changeState}></Input>
                    <Input type="number" chave="nome" description="Preço" placeholder={this.props.produto.preco} changeState={this.changeState}></Input>
                    <InputSelect type="idCategoria" changeState={this.changeState} description="Categorias" getUrl="categories/"/>
                </div>
                <div className="actions">
                    <button type="button" className="btn btn-info left-block buttonAdd" onClick={this.updateProduto}> Salvar </button>
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