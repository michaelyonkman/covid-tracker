import React, { useState } from 'react';
import './App.css';
import StateData from './components/StateData';

function App() {
  const [selectState, setSelectState] = useState('mi');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19 Tracker</h1>
      </header>
      <select onChange={(e) => setSelectState(e.target.value)}>
        <option value="mi">Michigan</option>
        <option value="ca">California</option>
      </select>
      <StateData selectState={selectState} />
    </div>
  );
}

export default App;
