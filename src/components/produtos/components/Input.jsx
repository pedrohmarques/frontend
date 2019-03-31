import React, { Component } from 'react'
 
export default class Input extends Component{
    constructor(props) {
        super(props)
        this.changeState = this.changeState.bind(this)
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
            <input id={this.props.id} className="form-control" id={this.props.id} placeholder={this.props.placeholder} onChange={this.changeState}></input>
        </div>
        )
    }
}