import React, { Component } from 'react';
import { INITIAL_POKEMONS, PokemonDisplay } from './Pokemon';
import Battle from './Battle';

export default class RandomBattle extends Component {
  pokeApiUrl = "https://pokeapi.co/api/v2/pokemon/";
  backUrl = "http://localhost:3001/battles/"

  constructor(props) {
    super(props);
    this.state = {
      pokemons: {...INITIAL_POKEMONS},
      isBattle: false,
      p1Winner: false,
      p2Winner: false
    }
  }

  onClearPokes = () => {
    this.setState({ pokemons : {0: null, 1: null}, p1Winner: false, p2Winner: false });
  }

  onResetPokes = () => {
    this.setState({ pokemons: {...INITIAL_POKEMONS}, p1Winner: false, p2Winner: false });
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
        <div style={{display: "flex", justifyContent: "space-between", padding: "0 10px 10px 0"}}>
        <button 
          type="button"
          class="btn btn-success"
          onClick={() => this.loadRandomPokemons()}
        >Load Random</button>
        <button 
          type="button" 
          onClick={this.onClearPokes} 
          class="btn btn-warning"
        >Clear Battle</button>
        <button 
          type="button" 
          onClick={this.onResetPokes} 
          class="btn btn-secondary"
        >Reset Battle</button>
        </div>
        <div class="row">
          {
            this.state.isBattle ? 
            <Battle pokemons={this.state.pokemons} winner={this.onLeave} />
            :
            <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
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
          }
          {
            this.state.p1Winner ? 
            <div>{this.state.pokemons[0].name} Won!</div>
            : null
          }
          {
            this.state.p2Winner ?
            <div>{this.state.pokemons[1].name} Won!</div>
            : null
          }
          </div>
        {
          !this.state.isBattle && this.state.pokemons[0] && this.state.pokemons[1] ?
          <button onClick={this.onBattle}>Battle</button>
          :
          <button onClick={this.onLeave}>Run</button>
        }       
      </div>
    );
  }
  
  onBattle = () => {
    this.setState({isBattle: true, p1Winner: false, p2Winner: false});
    console.log("Battle!")
  }

  onLeave = (winner?) => {
    if (winner && this.state.pokemons) {
      console.log(winner);
      if (winner === this.state.pokemons[0].name){
        this.setState({p1Winner: true});
        fetch(this.backUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({winner: winner, loser: this.state.pokemons[1].name})
        })
      } else if (winner === this.state.pokemons[1].name){
        this.setState({p2Winner: true});
        fetch(this.backUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({winner: winner, loser: this.state.pokemons[0].name})
        })
      }
    }
    this.setState({isBattle: false});
  }
}
