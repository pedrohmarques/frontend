import React from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import axios from 'axios'
import '../css/Input.css'

export default class FieldAdd extends React.Component {
    constructor(props) {
      super(props)
      this.state = { open: false }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.saveCategoria = this.saveCategoria.bind(this)
      this.onChangeName = this.onChangeName.bind(this)
    }

    listCategorias (){
      axios.get(this.props.baseUrl+"categories/").then(function(callback){
          this.setState({data : callback.data})
      }.bind(this)).catch(function(response){
          console.log(response)
      });
    };
    openModal (){
      this.setState({ open: true })
    }
    closeModal () {
      this.setState({ open: false })
    }

    saveCategoria () {
      axios.post(this.props.baseUrl + 'categories/',
      {
          nome : this.state.categoria.nome
      }).then(function(callback){
         this.listCategorias()
      });
      
    }

    onChangeName(type,novoNome){
      this.setState({
        categoria:{
          [type]: novoNome
        }
      })
    }

    render() {
      return (
        <div className="d-inline">
        <button type="button" className={this.props.classButton} onClick={this.openModal}> <i className={this.props.classIcon}/>  {this.props.iconContent}</button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="popup">
                <div className="header"> <h5>Categoria</h5> </div>
                <div className="form-group content col-xs-4">
                    <Input type="nome" description="Nome" placeholder={this.props.nome} onChangeName={this.onChangeName}></Input>
                </div>
                <div className="actions">
                    <button type="button" className="btn btn-info left-block buttonAdd" onClick={this.saveCategoria}> Salvar </button>
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