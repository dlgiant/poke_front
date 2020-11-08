import React, { Component } from "react";

export default class App extends Component {
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
        {this.state.list ? (
          <div className="list-group">
            {this.state.battles.map(battle => (
              <li
                onClick={() => this.showCard(battle._id)}
                className="list-group-item list-group-item-action"
              >
                {battle.winner===1 ? battle.pokemon_1 : battle.pokemon_2}
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
