import React, {Component} from 'react'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'; 

import Field from './FieldComent'
import './Comentario.css'

const initialState = {
    listComentaries: [],
    comentarios: {
        comment: ""
    }
}

const url = 'https://will-list.herokuapp.com'

export default class Comentario extends Component{
    constructor(props){
        super(props)
        this.state = {...initialState}
        this.componentWillMount = this.componentWillMount.bind(this)
        this.removeComment = this.removeComment.bind(this)
        this.addComment = this.addComment.bind(this)
        this.renderRow = this.renderRow.bind(this)
        this.updateField = this.updateField.bind(this)
    }

    componentWillMount(){
        const list = localStorage.getItem('listSelect')
        axios(`${url}/lists/${JSON.parse(list).id}/comments/`).then(resp=>{
            this.setState({ listComentaries: resp.data })
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }

    removeComment(Idcomment){
        const list = localStorage.getItem('listSelect')
        const user = localStorage.getItem('USER')
        const body = {
            userId: JSON.parse(user).id
        }
        axios.delete(`${url}/lists/${JSON.parse(list).id}/comments/${Idcomment}`, body).then(resp => {
            NotificationManager.success('Comentario removido com sucesso!')
        }, error=> {
            NotificationManager.error(error.response.data.message)
        })
    }

    addComment(){
        const list = localStorage.getItem('listSelect')
        const user = localStorage.getItem('USER')

        axios(`${url}/lists/${JSON.parse(list).id}/comments?userId=${JSON.parse(user).id}&comment=${this.state.comentarios.comment}`)
        .then(resp=>{
            NotificationManager.success('Comentario adicionado com sucesso!')
            setTimeout(function(){
                window.location.reload()
            }, 1000)
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }

    updateField(event){
        const dados = {...this.state.comentarios}
        dados[event.target.name] = event.target.value
        this.setState({comentarios: dados})
    }

    renderRow(){
        return this.state.listComentaries.map(comentario =>{
            return(
                <div>
                    <label>{comentario.user.nome}:</label>
                    <label>{comentario.comment.comentario}</label>
                </div>
                
            )
        }) 
    }
    render(){
        return(
            <div className='comentarios'>
                <div className='content'>
                    {this.renderRow()}
                </div>
                <div className='button-comment'>
                <Field
                    comment = {this.state.comentarios.comment}
                    updateField={this.updateField}
                    addComment={this.addComment}
                ></Field>
                </div>
            </div>
            
        )
    }
}