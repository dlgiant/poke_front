import React, { Component } from 'react';

const INITIAL_POKEMONS = {
  pokemons: ['pikachu', 'bulbasaur'],
};

export default class RandomBattle extends Component {
  pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";

  constructor(props) {
    super(props);
    this.state = {
      pokemons: {
        0: 'pikachu',
        1: 'bulbasaur'
      },
      value: ''
    }
    /**
      {
      pokemons: {
        0: Object,
        1: Object
      }
    }
    */
  }

  onClearPokes = () => {
    this.setState({ pokemons : {0: '', 1: ''} });
  }

  onResetPokes = () => {
    this.setState({ ...INITIAL_POKEMONS });
  }

  loadRandomPokemons = () => {
    const id1 = "100";
    const id2 = "312";
    //this.onClearPokes();
    fetch(`${this.pokeApiUrl}${id1}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      this.setState(state => {
        console.log(resJson.name);
        const pokemons = state.pokemons[0] = resJson.name;
        return pokemons;
      });

      console.log(this.state.pokemons.length)
    });
    fetch(`${this.pokeApiUrl}${id2}`)
    .then(res => res.json())
    .then(resJson => {
      console.log(resJson);
      this.setState(state => {
        console.log(resJson.name);
        const pokemons = state.pokemons[1] = resJson.name;
        return pokemons;
      });

      console.log(this.state.pokemons.length)
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
          <div key={this.state.pokemons[0]} class="col-sm">{this.state.pokemons[0]}</div>
          <div key={this.state.pokemons[1]} class="col-sm">{this.state.pokemons[1]}</div>
        </div>
      </div>
    );
  }
}
