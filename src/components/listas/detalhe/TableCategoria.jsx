import React, {Component} from 'react'
import axios from 'axios'

const categoriaURL = 'https://will-list.herokuapp.com'
const initialState = {
    categories: []
}
export default class TableCategoria extends Component{

    constructor(props){
        super(props)
        this.state = {...initialState}
        this.componentWillMount = this.componentWillMount.bind(this)
        this.renderTable = this.renderTable.bind(this)
    }

    componentWillMount(){
        const list = localStorage.getItem('listSelect')
        axios(`${categoriaURL}/lists/${JSON.parse(list).id}/categories`).then(
            resp => {
                this.setState({ categories: resp.data })     
            }
        )
    }
    
    renderTable(){
        return this.state.categories.map(categoria =>{
            return(
                <table className="table">
                    <thead className="thead-dark">
                        <tr key={categoria.id}>
                            <th scope="col">{categoria.nome}</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={categoria.produtos.id}>
                            <td>{categoria.produtos.nome}</td>
                            <td>{categoria.produtos.preco}</td>
                            <td>
                                <button className="btn btn-danger" onClick={e=>this.props.redirectView(this.props.lista, this.props.grupo)}>
                                    <i className="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )
        }) 
    }

    render(){
        return(
           <div>
               {this.renderTable()}
           </div>
        )
    }

}