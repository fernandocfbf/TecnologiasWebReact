import React, { Component } from 'react'
import axios from 'axios' //importando axios
import { Redirect } from 'react-router-dom'

export default class preferencias extends Component {
    constructor(props) {
        super(props)

        // Inicializando o State com alguns valores para testarmos
        //é necessario iniciar o state
        this.state = {
            id: this.props.location.state.id,
            nome: this.props.location.state.nome,
            preferencias: this.props.location.state.preferencias,
            redirect: false,
            data: ['aps', 'todays-deals', 'audible', 'alexa-skills', 'amazon-devices', 'amazonfresh',
                'mobile-apps', 'arts-crafts', 'automotive', 'baby-products', 'beauty', 'fashion', 'live-explorations',
                'collectibles', 'computers', 'financial', 'digital-music', 'electronics', 'garden', 'industrial',
                'office-products', 'luxury-beauty', 'smart-home', 'software', 'sporting', 'toys-and-games', 'videogames']
        }



        this.addPreferencias = this.addPreferencias.bind(this)
        this.confirma = this.confirma.bind(this)
    }


    addPreferencias(event) {
        console.log(this.state.preferencias)
        if (event.target.checked == true) {
            const addpreferencias = this.state.preferencias
            const caixaSelecionada = event.target.value

            addpreferencias.push(caixaSelecionada)
            this.setState({ username: addpreferencias });
        } else {
            var lista = this.state.preferencias
            var elemento_para_remover = event.target.value

            var index = lista.indexOf(elemento_para_remover);
            if (index !== -1) {
                lista.splice(index, 1);
            }
            
            this.setState({preferencias: lista})
        }

    }



    async confirma() {
        await axios.post('http://localhost:3000/preferencias', { nome: this.state.nome, preferencias: this.state.preferencias })
        this.setState({ redirect: true })
        console.log(this.state)
    }


    render() {
        if (this.state.redirect == true) {
            console.log("ENTREI")
            return (
                <Redirect to={
                    {
                        pathname: "/home",
                        state: {
                            id: this.state.id,
                            nome: this.state.nome,
                            preferencias: this.state.preferencias
                        }
                    }
                }
                />
            )

        } else {

            const data = this.state.data
            const liCategorias = data.map(categoria => {
                console.log("preferencias", this.state.preferencias)
                console.log("categoria", categoria)
                console.log(this.state.preferencias.includes(categoria))
                if(this.state.preferencias.includes(categoria)){
                    return (

                        <div>
                            <label><input onChange={this.addPreferencias} type="checkbox" name="option" value={categoria} checked="checked"></input>{categoria}</label>
                            <br></br>
                        </div>
    
                    )
                } else{
                    return (

                        <div>
                            <label><input onChange={this.addPreferencias} type="checkbox" name="option" value={categoria}></input>{categoria}</label>
                            <br></br>
                        </div>
    
                    )
                }
                
            })

            return (
                <div>
                    <h1>Bem-vindo</h1>
                    <p>Escolha algumas das opções abaixo para uma melhor experiência</p>
                    <ul>
                        {liCategorias}
                    </ul>

                    <button onClick={this.confirma}>Confirmar</button>
                </div>
            )
        }
    }
}
