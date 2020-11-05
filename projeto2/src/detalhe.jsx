import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class Detalhe extends Component {
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

            detalhes: {
                title: 'aa',
                description:'bbb',
                recursos: 'ccc',
                link:'',
                price:'0.0',
                images:[]
            


            }

           

        }
        
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        axios.post('http://localhost:3000/produto', {id: this.state.usuario.produto.id})
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

            </li><button onClick={Amazon}>Comprar</button>
                
            </div>
        )

    }


}