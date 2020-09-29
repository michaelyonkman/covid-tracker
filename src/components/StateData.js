import React, { useState, useEffect, Fragment } from 'react';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory';

const StateData = (props) => {
  const [data, setData] = useState([]);

  const doFetch = async (state) => {
    let response = await fetch(
      `https://api.covidtracking.com/v1/states/${state}/daily.json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      let json = await response.json();
      const formattedData = json.slice(0, 7).map((day) => {
        const container = {};
        container.date = new Date(day.lastUpdateEt);
        container.positiveIncrease = day.positiveIncrease;
        return container;
      });
      setData(formattedData);
    }
  };

  useEffect(() => {
    doFetch(props.selectState);
  }, [props.selectState]);

  if (!data.length) {
    return <div>Loading...</div>;
  } else {
    return (
      <Fragment>
        <h1>New Cases</h1>
        <VictoryChart theme={VictoryTheme.material} domainPadding={20}>
          <VictoryBar data={data} x="date" y="positiveIncrease" />
        </VictoryChart>
      </Fragment>
    );
  }
};

export default StateData;
