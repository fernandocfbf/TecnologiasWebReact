import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class Detalhe extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
           

            detalhes: {
                price:'0.0',
                title: 'aa',
                description:'bbb',
                recursos: [],
                link:'',
                images:[]
            


            }

           

        }
        
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        console.log(props.match.params.id)
        axios.post('http://localhost:3000/produto', {id: props.match.params.id})
            .then(resp => {
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)

                    this.setState({ detalhes: resp.data })

                    return;
                }

                //console.log(resp.data)
            })
            .catch(erro => console.log(erro))

    }


    render() {   
        
        
        var detalhes = this.state.detalhes
        var Amazon = "window.location.href="+this.state.detalhes.link

        return (
            <div>

                <li key={detalhes} style={{display:'flex'}} >   
                {detalhes.price}
                <br></br>
                {detalhes.title}
                <br></br>
                {detalhes.description}
                <br></br>
                {detalhes.recursos}
                <br></br>
                {detalhes.link}
                <br></br>
                {detalhes.images}






            </li><button onClick={Amazon}>Comprar</button>
                
            </div>
        )

    }


}