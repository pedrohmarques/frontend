import React, { Component } from 'react'
import Popup from "reactjs-popup";
import Input from "./input/Input"
import InputImg from "./input/InputImg"
import './input/Input.css'

export default class NewList extends Component{
    constructor(props) {
        super(props)
        this.state = { open: false, selected: ""}
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
      }
      openModal (){
        this.setState({ open: true })
      }
      closeModal () {
        this.setState({ open: false })
      }
      handleChange(e){
        this.setState({
          selected: e.target.value
        })
      }

      updateList(){
        this.props.createList(this.state.selected)
        this.closeModal()
      }

      renderGroups(){
          return this.props.list.map(groups => {
            return(
                <option value={groups.id}>{groups.nome}</option>
            )
          })
      }
      
    render(){
        return(
        <div>
            <button type="button" className="btn btn-dark center-block" onClick={this.openModal}> <i className="fa fa-plus"/>  Nova Lista</button>
            <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}
            >
                <div className="popup">
                    <div className="header"> <h5>Cadastro de Lista</h5> </div>
                    <div className="content col-xs-4">
                        <Input id="name" description="Nome da Lista" placeholder="lista dos 5"
                            name="nome" value={this.props.dadoLista.nome}
                            onChange={e=>this.props.updateField(e)}
                        ></Input>
                        <div className="form-group">
                            <label><h6>Selecione o Grupo</h6></label>
                            <select className="form-control" name="groupId"
                            value={this.state.selected} 
                            onChange={e => this.handleChange(e)}>
                                <option></option>
                                {this.renderGroups()}
                            </select>
                        </div>
                    </div>
                    <div className="actions">
                        <button type="button" className="btn btn-info left-block buttonAdd" onClick={e =>this.updateList()}> Salvar </button>
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