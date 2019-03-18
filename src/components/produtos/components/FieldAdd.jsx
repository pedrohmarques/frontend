import React, { Component } from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import InputImg from "./InputImg"
import '../css/Input.css'

export default class FieldAdd extends React.Component {
    constructor(props) {
      super(props)
      this.state = { open: false }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
    }
    openModal (){
      this.setState({ open: true })
    }
    closeModal () {
      this.setState({ open: false })
    }
  
    render() {
      return (
        <div>
        <button type="button" className="btn btn-dark center-block" onClick={this.openModal}> <i className="fa fa-plus"/>  Novo Produto</button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="popup">
                <div className="header"> <h5>Produto</h5> </div>
                <div className="content col-xs-4">
                    <InputImg id="imagem" description="Imagem"></InputImg>
                    <Input id="valor" description="Preço" placeholder="5,00" ></Input>
                    <Input id="produto" description="Nome" placeholder="Coca-Cola 250ml" ></Input>
                </div>
                <div className="actions">
                    <button type="button" class="btn btn-info left-block buttonAdd" onClick={this.closeModal}> Salvar </button>
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