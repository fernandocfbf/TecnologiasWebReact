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


            detalhes: [{
                price:'0.0',
                title: 'aa',
                description:'bbb',
                recursos: '',
                link:'',
                image:''
        
            }],
            id: props.match.params.id,

            redirect: false


           

        }
        
        // Fazendo a requisição assíncrona do GET lista de usuários e atualizando o state
        console.log(props.match.params.id)
        axios.post('http://localhost:3000/produto', {id: props.match.params.id})
            .then(resp => {
                console.log(resp.data)
                if (Math.floor(resp.status / 100) === 2) { // Checa se o response status code é 2XX(sucesso)

                    this.setState({detalhes: resp.data[0]})

                    return;
                }

                //console.log(resp.data)
            })
            .catch(erro => console.log(erro))

            this.avaliacao = this.avaliacao.bind(this)

    }

    avaliacao(){
        this.setState({ redirect: true })

    }



    render() {   
        
        
        var detalhes = this.state.detalhes

        if (this.state.redirect === true) {
            return (
                <Redirect to={
                    {
                        pathname: "/avaliacoes/"+this.state.id,
                        state: {
                            id: this.state.usuario.id,
                            nome: this.state.usuario.nome,
                            preferencias: this.state.usuario.preferencias,
                            link: this.state.detalhes.link
                        }
                    }
                }
                />
            )
        }
        

        return (
            <div>

                <li key={detalhes.title} style={{display:'flex'}} >   
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
                <img src={detalhes.image} ></img>


            </li>
            <a href={detalhes.link}>
            <button>Comprar</button>
            </a>
            
            <button onClick={this.avaliacao}>Avaliação do produto</button>

                
            </div>
        )

    }


}