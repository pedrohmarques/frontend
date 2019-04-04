import React, { Component } from 'react'
import Popup from "reactjs-popup";
import Input from "../input/Input"
import InputImg from "../input/InputImg"
import '../input/Input.css'

export default class AlteraProdutoPopup extends Component{
    constructor(props) {
        super(props)
        this.state = { open: false}
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
      }
      openModal (){
        this.setState({ open: true })
      }
    closeModal () {
        this.setState({ open: false })
    }
      
    render(){
        return(
        <div>
            <button className="btn btn-primary btn-sm" onClick={this.openModal}>
                <i className="fa fa-plus ml-2"></i>
            </button>
            <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}>
                <div className="popup">
                    <div className="header"> <h5>Adicionar Usuário</h5> </div>
                    <div className="content col-xs-4">
                        <Input id="name" description="Nome da Lista" placeholder="Grupo de 5"
                        ></Input>
                    </div>
                    <div className="actions">
                        <button type="button" class="btn btn-info left-block buttonAdd" onClick={e => this.props.update(this.props.lista)}> Salvar </button>
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