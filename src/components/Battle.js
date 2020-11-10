import { Context } from '../Provider';
import React, { Component } from 'react';

export default class Battle extends Component {
  constructor(props){
    super(props);
    this.state = { 
      pokemons: {...props.pokemons},
      poke1HP: props.pokemons[0].stats[0].base_stat,
      poke2HP: props.pokemons[1].stats[0].base_stat,
      battleStatus: ["Start Battle!"]
    };
    this.is2Turn = false;
  }

  render() {
    return <>
      <div style={{width: "100%"}}>
        <Context.Consumer>
        {(context) => (
          <div>
            <h4 style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              {this.state.pokemons[0].name} vs {this.state.pokemons[1].name}
            </h4>
             {
                this.state.battleStatus.map(message => {
                  return (
                    <h5>
                      {message}
                    </h5>
                  )
                })
              }
            <div key={this.state.pokemons[0].name} class="col-sm" 
              style={{
                border: "5px solid black",
                borderRadius: "10px",
                margin: "0 10px 0 10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"}}> 
              <div style={{paddingTop: "20px"}}>
                <div style={{
                  backgroundImage: 'url('+this.state.pokemons[0].sprites.back_default + ')',
                  width: "100px",
                  height: "100px"}} 
                  alt={this.state.pokemons[0].name+" back_default picture"}>
                </div>
                <div style={{position: "relative"}}>
                  <div style={{
                    position: "absolute",
                    zIndex: "8",
                    backgroundColor: "green",
                    width: (this.state.poke1HP/this.state.pokemons[0].stats[0].base_stat*100)+"%",
                    height: "20px"}}></div>
                  <div style={{
                    position: "absolute",
                    zIndex: "10"}}>
                    HP: {this.state.poke1HP}/{this.state.pokemons[0].stats[0].base_stat}
                  </div>
                </div>
              </div>
              <div 
                style={{
                  paddingTop: "40px",
                  paddingBottom: "80px",
                  transform: "translate(-20px, 0)"
                }}>
                <div style={{position: "relative"}}>
                  <div style={{
                    position: "absolute",
                    zIndex: "8",
                    backgroundColor: "green",
                    width: (this.state.poke2HP/this.state.pokemons[1].stats[0].base_stat*100)+"%",
                    height: "20px"}}>
                  </div>
                  <div style={{
                    position: "absolute",
                    zIndex: "10"
                    }}>
                    HP: {this.state.poke2HP}/{this.state.pokemons[1].stats[0].base_stat}
                  </div>
                </div>
                <div style={{backgroundImage: 'url('+this.state.pokemons[1].sprites.front_default + ')', width: "100px", height: "100px"}} alt={this.state.pokemons[1].name+" front_default picture"}>
                </div>
              </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
              <button onClick={() => this.onAttack(context)}>Attack</button>
              <button onClick={() => this.onDefend(context)}>Defend</button>
              <button >Items</button>
            </div>
          </div>
        )}
        </Context.Consumer>
      </div>
    </>
  }

  onAttack = (context) => {
    /** 
     * Hit is calculated using two random numbers: 
     * 1 considering the defense of opponent  
     * 1 considering the attack of current player
     */
    let opp, player;

    if (this.is2Turn) [player, opp] = [1, 0];
    else [player, opp] = [0, 1];

    /**
     * Game logic
     */
    const randomizeDefense = Math.floor(Math.random()*this.state.pokemons[opp].stats[2].base_stat);

    const randomizeAttack = Math.floor(Math.random()*this.state.pokemons[player].stats[1].base_stat);
    const hit = randomizeAttack-randomizeDefense > 0 ? randomizeAttack - randomizeDefense : 0;
    const HP = player === 0 ? this.state.poke2HP : this.state.poke1HP;
    const currentHP = HP - hit > 0 ? HP - hit : 0;

    /** 
     * Setting game status messages
     */
    let messages = [this.state.pokemons[opp].name + (hit ? ` took ${hit} in damage` : ` successfully blocked hit`)];
    if (currentHP === 0) {
      messages.push(`${this.state.pokemons[opp].name} passed out`);
      messages.push(`${this.state.pokemons[player].name} won`);
      this.sendWinner(this.state.pokemons[player].name);
      context.setRefresh(true);
    }

    /**
     * Setting current HP
     */
    if (player === 0) this.setState({poke2HP: currentHP});
    else this.setState({poke1HP: currentHP})

    this.setState({battleStatus: messages});
    
    // Triggering player 2 round
    if (player === 0) {
      if (currentHP !== 0){
        setTimeout(()=> {
          this.is2Turn = true;
          this.onAttack(context);
          console.log("Waited 3 secs");
        }, 3000);
      }
    } else this.is2Turn = false
  }

  sendWinner = (winner) => {
    this.props.winner(winner);
  }

  onDefend = (context) => {
    console.log("Defended");
    console.log(context);
    context.setRefresh(true);
    //context.state.refreshPreviousBattles = !context.state.refreshPreviousBattles;
  }
}
