import React, {Component} from 'react'
import axios from 'axios'

export default class Lista extends Component{

    render(){
        return(
            <table className="table">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">Integrantes</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {this.renderRows()} */}
                </tbody>
            </table>
        )
    }
}