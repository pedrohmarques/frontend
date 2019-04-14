import React, { Component } from 'react'
 
export default class Input extends Component{
    render(){
        return(
        <div className="form-group">
            <label><h6>{this.props.description}</h6></label>
            <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder} name={this.props.name} value={this.props.value} onChange={e=>this.props.onChange(e)}></input>
        </div>
        )
    }
}