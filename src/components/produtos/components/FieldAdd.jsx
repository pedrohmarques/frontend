import React from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import InputImg from "./InputImg"
import InputSelect from "./InputSelect"
import axios from 'axios'
import {NotificationManager} from 'react-notifications';
import '../css/Input.css'

export default class FieldAdd extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        open: false,
        nome: '',
        preco: '',
        idCategoria: ''
      }
      this.openModal = this.openModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.changeState = this.changeState.bind(this)
      this.saveProduto = this.saveProduto.bind(this)
    }
    openModal (){
      this.setState({ open: true })
    }
    closeModal () {
      this.setState({ open: false })
    }
    
    changeState(type,novoDado){
      this.setState({
          [type]: novoDado
      })
    }
    saveProduto () {
      axios.post(this.props.baseUrl+'products/?nome='+this.state.nome+'&preco='+this.state.preco+'&idCategoria='+this.state.idCategoria,{
          // nome : this.state.nome,
          // preco : this.state.preco,
          // idCategoria : this.state.idCategoria
      }).then(function(callback){
          this.closeModal()  
          NotificationManager.success('Salvo com sucesso.','',2000)
          this.props.listProdutos()
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
                <div className="header"> <h5>Produto</h5> </div>
                <form method="POST" id="form">
                  <div className="form-group content col-xs-4">
                      <Input type="nome" description="Nome" placeholder={this.props.produto} changeState={this.changeState}></Input>
                      <Input type="preco" description="Preço" placeholder={this.props.preco} changeState={this.changeState}></Input>
                      <InputSelect type="idCategoria" description="Categorias" getUrl="categories/" changeState={this.changeState} />
                  </div>
                </form>
                <div className="actions">
                    <button type="button" className="btn btn-info left-block buttonAdd" onClick={this.saveProduto}> Salvar </button>
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