import React from 'react';
import USMap from './USMap';
import StateData from './StateData';

const USData = (props) => {
  console.log('PROPS', props);
  return (
    <div className="container">
      <h1>US Data</h1>
      <div className="row">
        <div className="col-md-9">
          <USMap />
        </div>
        <div className="col-md-3">
          <StateData selectState={props.selectState} />
          <StateData selectState={props.selectState} />
          <StateData selectState={props.selectState} />
          <StateData selectState={props.selectState} />
        </div>
      </div>
    </div>
  );
};

export default USData;
