import React, {Component} from 'react'
import axios from 'axios'
import { NotificationManager } from 'react-notifications';  

const initialState = {
    listComentaries: []
}

const url = 'https://will-list.herokuapp.com'

export default class Comentario extends Component{
    constructor(props){
        super(props)
        this.state = {...initialState}
        this.componentWillMount = this.componentWillMount.bind(this)
        this.removeComment = this.removeComment.bind(this)
        this.addComment = this.addComment.bind(this)
    }

    componentWillMount(){
        const list = localStorage.getItem('listSelect')
        axios(`${url}/lists/${JSON.parse(list).id}/comments`).then(resp=>{
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

    addComment(comment){
        const list = localStorage.getItem('listSelect')
        const user = localStorage.getItem('USER')

        axios(`${url}/lists/${JSON.parse(list).id}/comments?userId=${JSON.parse(user).id}&comment=${comment}`)
        .then(resp=>{
            NotificationManager.success('Comentario adicionado com sucesso!')
        },error=>{
            NotificationManager.error(error.response.data.message)
        })
    }

    render(){
        return(
            <div>
                
            </div>
        )
    }
}