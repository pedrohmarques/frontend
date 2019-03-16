import React, { Component } from 'react'
import Popup from "reactjs-popup";
import Input from "./Input"
import InputImg from "./InputImg"
import '../css/Input.css'

export default () => (
  <Popup trigger={<button type="button" class="btn btn-dark center-block"> <i class="fa fa-plus"></i>  Novo Produto</button>} position="right center">
    {close => (
    <div className="popup">
      <a className="close" onClick={close}>
        &times;
      </a>
      <div className="header"> <h5>Produto</h5> </div>
      <div className="content col-xs-4">
            <InputImg id="imagem" description="Imagem"></InputImg>
            <Input id="valor" description="Preço" placeholder="5,00" ></Input>
            <Input id="produto" description="Nome" placeholder="Coca-Cola 250ml" ></Input>
      </div>
      <div className="actions">
            <button type="button" class="btn btn-info left-block buttonAdd"
            onClick={() => {
                close()
            }}
            > Salvar
            </button>
       </div>
      <div className="actions">
            
      </div>
    </div>
  )}
  </Popup>
);

