import React from 'react'
import Popup from "reactjs-popup";
import axios from 'axios'

export default class FieldDel extends React.Component {
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
        <button type="button" className="btn btn-warning ml-2" onClick={this.openModal}> <i className="fa fa-trash"/></button>
          <Popup
            open={this.state.open}
            closeOnDocumentClick
            onClose={this.closeModal}
          >
            <div className="popup">
                <div className="header"></div>
                <div className="content col-xs-4">
                    <h5>Deseja Excluir</h5>
                    <h4>{this.props.produto.nome}</h4>
                </div>
                <div className="actions">
                    <button type="button" class="btn btn-danger left-block buttonAdd" onClick={this.closeModal}> Excluir </button>
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