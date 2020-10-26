import React from 'react';
import './App.css';
import Routes from './routes'


function App() {

    return (
        <div className="App">
            <header className="App-header">
                <h1>Demo Tecweb</h1>
                <Routes />
            </header>
        </div>
    );
}

function cadastrar() {
    axios.post('http://localhost:3003/usuarios', this.state.usuario).then(resp => {
        if (Math.floor(resp.status / 100) === 2) {
            this.setState((state) => {
                return {
                    lista: [...state.lista, state.usuario],
                    usuario: { username: '' }
                }
            })
            return;
        }
        console.log(resp)
    })
        .catch(erro => console.log(erro))
}

// event.target representa o elemento que causou o trigger do evento que chamou o método (no caso, será o input do nome)
function handleChange(event) {
    var handleState = (state, event) => {
        state.usuario[event.target.name] = event.target.value
        return state
    }

    this.setState(handleState(this.state, event))
}

export default App;
