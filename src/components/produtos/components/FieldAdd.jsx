import React from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import InputImg from "./InputImg"
import InputSelect from "./InputSelect"
import axios from 'axios'
import $ from 'jquery'
import '../css/Input.css'

export default class FieldAdd extends React.Component {
    constructor(props) {
      super(props)
      this.state = { 
        open: false,
        produto : '',
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

    changeState (type, value){
      var self = this;
      this.setState({[type]  : value});
    }
    saveProduto () {
      // axios.post("https://will-list.herokuapp.com/products/",{
      //     nome : this.state.produto,
      //     preco : this.state.preco,
      //     idCategoria : this.state.idCategoria
      // }).then(function(callback){
      //       console.log(callback)
      // })
      this.closeModal()
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
                      <InputImg id="imagem" description="Imagem"></InputImg>
                      <Input id="preco" changeState={this.changeState} description="Preço" placeholder={this.props.preco}></Input>
                      <Input id="produto" changeState={this.changeState} description="Nome" placeholder={this.props.produto}></Input>
                      <InputSelect id="idCategoria" changeState={this.changeState} description="Categorias" getUrl="categories/" />
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