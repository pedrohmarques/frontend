import React, { Component } from 'react'
 
export default class Input extends Component{
    constructor(props) {
        super(props)
    }
    render(){
        return(
        <div>
            <label ><h6>{this.props.description}</h6></label>
            <input id={this.props.id} className="form-control" id={this.props.id} placeholder={this.props.placeholder} onChange={(e) => this.props.onChangeState(this.props.type,e.target.value)}></input>
        </div>
        )
    }
}