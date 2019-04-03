import React from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import '../css/Input.css'

const url = "https://will-list.herokuapp.com/";

export default class FieldEdit extends React.Component {
    constructor(props) {
      super(props)
      this.state = { open: false }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.onChangeName = this.onChangeName.bind(this)
      this.updateCategoria = this.updateCategoria.bind(this)
    }
    openModal (){
      this.setState({ open: true })
    }
    closeModal () {
      this.setState({ open: false })
    }

    updateCategoria(){
      this.props.updateCategoria(this.state.categoria)
      this.closeModal()
    }
    onChangeName(type,novoNome){
      this.setState({
        categoria:{
          id : this.props.categoria.id,
          [type]: novoNome
        }
      })
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
                <div className="header"> <h5>Categoria</h5> </div>
                <div className="form-group content col-xs-4">
                    <Input type="nome" description="Nome" placeholder={this.props.categoria.nome} onChangeName={this.onChangeName}></Input>
                </div>
                <div className="actions">
                    <button type="button" className="btn btn-info left-block buttonAdd" onClick={(e) => this.updateCategoria(this.state.categoria)}> Salvar </button>
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