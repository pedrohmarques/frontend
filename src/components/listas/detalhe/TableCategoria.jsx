import React, {Component} from 'react'
import axios from 'axios'

const categoriaURL = 'http://localhost:8080/categories'

export default class TableCategoria extends Component{
    getCategoria(){
        const id = '1'
        axios.get(`${categoriaURL}/${id}`).then(
            resp => {
               return resp.data        
            }
        )
    }
    
    renderTable(){
        '1'
        // Promise.all(this.getCategoria()).then(resp=>{
        //     console.log(resp)
        // })
        // return categorias.map(produto =>{
        //     return(
        //         <table className="table">
        //             <thead className="thead-dark">
        //                 <tr key={produto.categoria.id}>
        //                     <th scope="col">{produto.categoria.nome}</th>
        //                 </tr>
        //             </thead>
        //             <tbody>
        //                 <tr key={produto.id}>
        //                     <td>{produto.nome}</td>
        //                     <td>{produto.preco}</td>
        //                 </tr>
        //             </tbody>
        //         </table>
        //     )
        // }) 
        
    }

    render(){
        return(
           <div>
               {this.renderTable()}
           </div>
        )
    }

}