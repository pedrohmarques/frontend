import React, { Component } from 'react'
 
export default class Input extends Component{
    render(){
        return(
        <div>
            <label ><h6>{this.props.description}</h6></label>
            <input type={this.props.type} className="form-control" id={this.props.id} placeholder={this.props.placeholder}></input>
        </div>
        )
    }
}