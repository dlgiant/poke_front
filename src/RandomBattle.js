import React, { Component } from 'react';
import INITIAL_POKEMONS from './Pokemon';

export default class RandomBattle extends Component {
  pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";

  constructor(props) {
    super(props);
    this.state = {
      pokemons: {...INITIAL_POKEMONS},
      value: ''
    }
  }

  onClearPokes = () => {
    this.setState({ pokemons : {0: null, 1: null} });
  }

  onResetPokes = () => {
    this.setState({ pokemons: {...INITIAL_POKEMONS}});
  }

  loadRandomPokemons = () => {
    const id1 = Math.floor(Math.random() * 894);
    const id2 = Math.floor(Math.random() * 894);
    this.onClearPokes();
    fetch(`${this.pokeApiUrl}${id1}`)
    .then(res => res.json())
    .then(resJson => {
      this.setState(state => {
        const pokemons = state.pokemons[0] = {...resJson};
        return pokemons;
      });
    });
    fetch(`${this.pokeApiUrl}${id2}`)
    .then(res => res.json())
    .then(resJson => {
      this.setState(state => {
        const pokemons = state.pokemons[1] = {...resJson};
        return pokemons;
      });
    });
  }

  render() {
    return(
      <div class="container">
        <h2>Random Battle:</h2>
        <button 
          type="button"
          class="btn btn-success"
          onClick={() => this.loadRandomPokemons()}
        >Load Random Pokemons</button>
        <button 
          type="button" 
          onClick={this.onClearPokes} 
          class="btn btn-warning"
        >Clear Pokemon Battle</button>
        <button 
          type="button" 
          onClick={this.onResetPokes} 
          class="btn btn-secondary"
        >Reset Pokemon Battle</button>
        <div class="row">
          {
            this.state.pokemons[0] ?
            <PokemonDisplay state={this.state.pokemons[0]}/>
            : null
          }
          {
            this.state.pokemons[1] ?
            <PokemonDisplay state={this.state.pokemons[1]}/>
            : null
          }
        </div>
      </div>
    );
  }
}

class PokemonDisplay extends Component {
  constructor(props){
    super(props);
    console.log(props);  
    this.state = props.state;
  }
  render() {
    return(
      <div key={this.state.name} class="col-sm" style={{border: "5px solid black", borderRadius: "10px", margin: "0 10px 0 10px", display: "flex", justifyContent: "center", alignItems: "center"}}> 
        <div>
          <h4>
            {this.state.name}
          </h4>
          <div style={{backgroundImage: 'url('+this.state.sprites.front_shiny + ')', width: "100px", height: "100px"}} alt={this.state.name+" front_shiny picture"}>
          </div>
          <div >
            <div>HP: {this.state.stats[0].base_stat}</div>
            <div>Attack: {this.state.stats[1].base_stat}</div>
            <div>Defense: {this.state.stats[2].base_stat}</div>
            <div>Wins: </div>
            <div>Losses: </div>
          </div>
        </div>
      </div>
    );
  }
}
