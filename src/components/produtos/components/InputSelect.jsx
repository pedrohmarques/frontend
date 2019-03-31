import React, { Component } from 'react'
import axios from 'axios';
 
const baseUrl = "https://will-list.herokuapp.com/"
export default class InputSelect extends Component{
    constructor(props) {
        super(props)
        this.state = { data: []}
        this.renderRows = this.renderRows.bind(this)
        this.changeState = this.changeState.bind(this)
        this.renderRows()
    }
    
    renderRows(){
        axios.get(baseUrl + this.props.getUrl).then(function(callback){
            this.setState({data : callback.data})
        }.bind(this)).catch(function (response) {
            console.log(response);
        });
    }

    changeState(e){
        var value = e.currentTarget.value
        var type = this.props.id
        this.props.changeState(type,value)
    }
    render(){
        return(
        <div>
            <label ><h6>{this.props.description}</h6></label>
            <select className="form-control" onChange={this.changeState}>
                <option></option>
                {this.state.data.map(row =>(
                    <option value={row.id}>{row.nome}</option>
                    )
                )}
            </select>
        </div>
        )
    }
}