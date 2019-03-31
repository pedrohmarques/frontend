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

    saveProduto () {
      axios.post(this.props.openModal)
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
                <div className="content col-xs-4">
                    <InputImg id="imagem" description="Imagem"></InputImg>
                    <Input id="valor" description="Preço" placeholder={this.props.preco}></Input>
                    <Input id="produto" description="Nome" placeholder={this.props.produto}></Input>
                    <InputSelect description="Categorias"/>
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