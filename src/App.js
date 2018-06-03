import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Roulette from './components/Roulette'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Roulette />
      </div>
    );
  }
}

export default App;
