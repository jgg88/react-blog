import React, { Component } from 'react';
import './App.css';
import Main from './components/Main';
class App extends Component {

  render() {
    return (
      <div className="App">
        <header>
          <h1>The Daily <span>Ketchup</span></h1>
        </header>
        <Main/>
      </div>
    );
  }
}

export default App;
