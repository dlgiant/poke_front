import React, { Component } from "react";

export default class Battles extends Component {
  constructor(props) {
    super();
    this.state = {
      list: true,
      card: false,
      battles: [],
      battle: {}
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/battles/list")
    .then(res => res.json())
    .then( resJson => {
      this.setState({ battles: resJson.data });
    });
  }

  showCard = id => {
    fetch(`http://localhost:3001/battles/${id}`)
    .then(res => res.json())
    .then(resJson => {
      this.setState({ battle: resJson.data });
    });
    this.setState({
      list: false,
      card: true
    });
  }

  showList = () => {
    this.setState({
      card: false,
      list: true
    });
  }

  render() {
    return(
      <div className="container">
        <h2>Battles:</h2>
        {this.state.list ? (
          <div className="list-group">
            {this.state.battles.map(battle => (
              <li
                onClick={() => this.showCard(battle._id)}
                className="list-group-item list-group-item-action"
              >
                <span>{battle.pokemon_1}</span> vs <span>{battle.pokemon_2}</span>
              </li>
            ))}
          </div>
        ) : null }
        {this.state.card ? (
          <div class="card" style={{ width: "16rem" }}>
            <div class="card-body">
              <h5 class="card-title">{this.state.battle.winner}</h5>
              <p class="card-text">{this.state.battle.pokemon_1}</p>
              <p class="card-text">{this.state.battle.pokemon_2}</p>
              <div onClick={() => this.showList()} class="btn btn-primary">
                Back
              </div>
            </div>
          </div>
        ) : null }
      </div>
    );
  }
}
