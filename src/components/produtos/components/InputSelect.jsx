import React, { Component } from 'react'
import axios from 'axios';
 
var rows = [];
export default class InputSelect extends Component{
    constructor(props) {
        super(props)
        this.renderRows = this.renderRows.bind(this)
    }
    renderRows(){
        this.rows = axios.get(this.props.url)
    }
    render(){
        {this.renderRows()}
        return(
        <div>
            <label ><h6>{this.props.description}</h6></label>
            <select className="form-control">
                {rows.map(row =>(
                    <option>{row.nome}</option>
                    )
                )}
            </select>
        </div>
        )
    }
}