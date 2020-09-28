import React, { useState, useEffect } from 'react';

const StateData = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState({});

  const doFetch = async (state) => {
    let response = await fetch(
      `https://api.covidtracking.com/v1/states/${state}/current.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      let json = await response.json();
      setIsLoaded(true);
      setData(json);
      console.log(json);
    }
  };

  useEffect(() => {
    doFetch('ca');
  }, []);
  if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <div>{data.death}</div>;
  }
};

export default StateData;
