import React, { Component } from "react";
import Battles from "./Battles";
import RandomBattle from "./RandomBattle";

export default class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return(
      <div>
        <RandomBattle />
        <Battles />
      </div>
    );
  }
}
