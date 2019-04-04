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
            this.props.changeState(this.props.type, callback.data[0].id)
        }.bind(this)).catch(function (response) {
            console.log(response);
        });
    }

    render(){
        return(
        <div >
            <label className="mt-3 mb-0"><h6>{this.props.description}</h6></label>
            <select className="form-control" onChange={(e) => this.props.changeState(this.props.type, e.target.value)}>
                {this.state.data.map(row =>(
                    <option key={row.id} value={row.id}>{row.nome}</option>
                    )
                )}
            </select>
        </div>
        )
    }
}