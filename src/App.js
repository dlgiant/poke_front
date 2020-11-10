import React, { Component } from "react";
import PreviousBattles from "./components/PreviousBattles";
import RandomBattle from "./components/RandomBattle";

export default class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return(
      <div>
        <RandomBattle />
        <PreviousBattles />
      </div>
    );
  }
}
