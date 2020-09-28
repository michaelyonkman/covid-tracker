import React from 'react';
import logo from './logo.svg';
import './App.css';
import StateData from './components/StateData';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19 Tracker</h1>
        <StateData />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
