import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class Avaliacoes extends Component { 
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {

            usuario:
            {
                id: this.props.location.state.id,
                nome: this.props.location.state.nome,
                preferencias: this.props.location.state.preferencias
            },

            avaliacao:[
                { data: '0.0', nome: 'mrbrightside', nota: "url", title: 'link', comentario: '12'}

            ],

            link: this.props.location.state.link,

            id: props.match.params.id
        
        }

        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        console.log(props.match.params.id)
        axios.post('http://localhost:3000/avaliacao', {id: props.match.params.id})
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)

                    this.setState({ avaliacao: resp.data })

                    return;
                }

                //console.log(resp.data)
            })
            .catch(erro => console.log(erro))



    }

    

    render() { 
        
        var Amazon = "window.location.href="+this.state.link

        var avaliacoes = this.state.avaliacao

        var liAva = avaliacoes.map(avaliacao => { 
            return (
                <div>

                    <li key={avaliacao.title} style={{display:'flex'}} >   
                    {avaliacao.data}
                    <br></br>
                    {avaliacao.nome}
                    <br></br>
                    {avaliacao.nota}
                    <br></br>
                    {avaliacao.title}
                    <br></br>
                    {avaliacao.comentario}
                    <br></br>
                    


                </li>
                
                <button onClick={Amazon}>Comprar</button>
                    
                </div>
            )

        })
        console.log(liAva)
        return({liAva});



    }

    




}
    
    
        
            

    
    


    
