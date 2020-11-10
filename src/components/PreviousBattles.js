import React, { Component } from "react";

export default class PreviousBattles extends Component {
  url = "http://localhost:3001/battles/"
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
    fetch(`${this.url}list`)
    .then(res => res.json())
    .then( resJson => {
      this.setState({ battles: resJson.data });
    });
  }

  showCard = id => {
    fetch(`${this.url}${id}`)
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
        <br/>
        <h2>Previous Battles:</h2>
        {this.state.list && this.state.battles ? (
          <div class="row">
            {this.state.battles.map(battle => (
              <div
                onClick={() => this.showCard(battle.id)}
                class="card col-sm-3"
              >
                <span><b>{battle.winner}</b> <br/> vs <br/>{battle.loser}</span>
              </div>
            ))}
          </div>
        ) : null }
        {this.state.card ? (
          <div class="card" style={{ width: "16rem" }}>
            <div class="card-body">
              <p class="card-text"><b>Winner: {this.state.battle.winner}</b></p>
              <p class="card-text">Loser: {this.state.battle.loser}</p>
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
