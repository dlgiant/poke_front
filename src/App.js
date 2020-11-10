import React, { Component } from "react";
import PreviousBattles from "./components/PreviousBattles";
import RandomBattle from "./components/RandomBattle";
import { Provider } from './Provider';


export default class App extends Component {
  constructor(props) {
    super();
  }

  render() {
    return(
      <div>
        <Provider>
          <div className="App">
            <RandomBattle />
            <PreviousBattles />
          </div>
        </Provider>
      </div>
    );
  }
}
