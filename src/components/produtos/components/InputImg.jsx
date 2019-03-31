import React, { Component } from 'react'
 
export default class InputImg extends Component{
    render(){
        return(
        <div className="form-group">
            <label for="exampleFormControlFile1"><h6>{this.props.description}</h6></label>
            <input type="file" className="form-control-file" id={this.props.id}></input>
        </div>
        )
    }
}