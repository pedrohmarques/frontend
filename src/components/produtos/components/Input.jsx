import React, { Component } from 'react'
 
export default class Input extends Component{
    render(){
        return(
        <div class="form-group">
            <label ><h6>{this.props.description}</h6></label>
            <input type={this.props.type} class="form-control" id={this.props.id} placeholder={this.props.placeholder}></input>
        </div>
        )
    }
}