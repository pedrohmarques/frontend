import React, { Component } from 'react'
import axios from 'axios';
 
const baseUrl = "https://will-list.herokuapp.com/"
export default class InputSelect extends Component{
    constructor(props) {
        super(props)
        this.state = { data: []}
        this.renderRows = this.renderRows.bind(this)
        this.renderRows()
    }
    
    renderRows(){
        axios.get(baseUrl + this.props.getUrl).then(function(callback){
            this.setState({data : callback.data})
        }.bind(this)).catch(function (response) {
            console.log(response);
        });
    }

    render(){
        return(
        <div>
            <label ><h6>{this.props.description}</h6></label>
            <select className="form-control" onChange={(e) => this.props.changeState(this.props.type, e.target.value)}>
                {this.state.data.map(row =>(
                    <option value={row.id}>{row.nome}</option>
                    )
                )}
            </select>
        </div>
        )
    }
}