import React, { Fragment, useEffect, useState } from 'react';
import './App.css';
import StateData from './components/StateData';
import USMap from './components/USMap';
import Loading from './components/Loading';
import LoadStatesTask from '../src/tasks/LoadStatesTask';
import Legend from '../src/components/Legend';
import legendItems from '../src/entities/LegendItems';

function App() {
  const [states, setStates] = useState([]);
  const LegendItemsInReverse = [...legendItems].reverse();

  const [selectState, setSelectState] = useState('mi');

  const load = () => {
    const loadStatesTask = new LoadStatesTask();
    loadStatesTask.load(setStates);
  };

  useEffect(load, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Covid-19 Tracker</h1>
      </header>
      {!states.length ? (
        <Loading />
      ) : (
        <div
          style={{
            width: '50%',
          }}
        >
          <USMap states={states} />
          <Legend legendItems={LegendItemsInReverse} />
        </div>
      )}
      <select onChange={(e) => setSelectState(e.target.value)}>
        <option value="mi">Michigan</option>
        <option value="ca">California</option>
      </select>

      <StateData selectState={selectState} />
    </div>
  );
}

export default App;
