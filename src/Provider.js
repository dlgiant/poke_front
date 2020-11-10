import React, { Component } from 'react';

const Context = React.createContext();
class Provider extends Component {
  state = { refreshPreviousBattles: false }
  render() {
    return(
      <Context.Provider value={
        {
          state: this.state,
          setRefresh: (value) => this.setState({refreshPreviousBattles: value})
        }
      }>
      {this.props.children}
      </Context.Provider>
    )
  }
}

export { Context, Provider }
