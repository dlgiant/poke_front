import React, { Component } from 'react';

const Pikachu = {
  name: 'pikachu',
  sprites: {
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png",
    back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/25.png",
    front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/25.png",
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
  },
  stats: [
    {base_stat: 35, effort: 0, stat: {name: "hp"}},
    {base_stat: 55, effort: 0, stat: {name: "attack"}},
    {base_stat: 40, effort: 0, stat: {name: "defense"}}
  ]
}

const Bulbasaur = {
  name: 'bulbasaur',
  sprites: {
    back_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png",
    back_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/1.png",
    front_shiny: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/1.png",
    front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  },
  stats: [
    {base_stat: 45, effort: 0, stat: {name: "hp"}},
    {base_stat: 49, effort: 0, stat: {name: "attack"}},
    {base_stat: 49, effort: 0, stat: {name: "defense"}}
  ]
}

let INITIAL_POKEMONS = {
  0: Pikachu,
  1: Bulbasaur
}

class PokemonDisplay extends Component {
  url = "http://localhost:3001/battles/"
  constructor(props){
    super(props);
    this.state = props.state;
  }

  componentDidMount() {
    fetch(`${this.url}wins/${this.state.name}`)
    .then(res => res.json())
    .then(resJson => {
      this.setState({ 
        wins: resJson.wins,
      });
    });
    fetch(`${this.url}losses/${this.state.name}`)
    .then(res => res.json())
    .then(resJson => {
      this.setState({ 
        losses: resJson.losses,
      });
    });
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
            <div>Wins: {this.state.wins || 0}</div>
            <div>Losses: {this.state.losses || 0}</div>
          </div>
        </div>
      </div>
    );
  }
}

export { INITIAL_POKEMONS, PokemonDisplay }

