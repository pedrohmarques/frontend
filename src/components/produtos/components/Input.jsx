import React, { Component } from 'react'
 
export default class Input extends Component{
    constructor(props) {
        super(props)
        this.props.changeState(this.props.type, this.props.placeholder)
    }
    render(){
        return(
        <div>
            <label className="mt-3 mb-0"><h6>{this.props.description}</h6></label>
            <input type={this.props.type} className="form-control" id={this.props.id} defaultValue={this.props.placeholder} onChange={(e) => this.props.changeState(this.props.type,e.target.value)}></input>
        </div>
        )
    }
}