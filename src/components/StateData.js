import React, { useState, useEffect, Fragment } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
} from 'victory';

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
      const formattedData = json
        // .slice(0, 8)
        .reverse()
        .map((day) => {
          const container = {};
          container.date = new Date(day.lastUpdateEt).toLocaleDateString();
          container.dateShort = container.date.slice(0, -5);

          container.positiveIncrease = day.positiveIncrease;
          return container;
        });
      setData(formattedData);
    }
  };

  useEffect(() => {
    doFetch(props.selectState);
  }, [props.selectState]);

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  if (!data.length) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="chart-container">
        <h1>New Cases</h1>
        <VictoryChart
          fixLabelOverlap={true}
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryBar
            data={data}
            labels={({ datum }) =>
              `${datum.date}\n${numberWithCommas(datum.positiveIncrease)}`
            }
            labelComponent={
              <VictoryTooltip
                constrainToVisibleArea
                pointerOrientation="right"
                dy={0}
                dx={-12}
                pointerWidth={25}
                flyoutHeight={25}
                flyoutWidth={50}
                cornerRadius={0}
                centerOffset={{ x: -50 }}
                style={{
                  fontSize: '5px',
                  fontFamily: 'Roboto Mono',
                  color: 'red',
                }}
                flyoutStyle={{ stroke: 'rgb(116, 31, 31)', strokeWidth: 0.5 }}
              />
            }
            x="dateShort"
            y="positiveIncrease"
            style={{
              data: { fill: 'rgb(156, 41, 41)' },
            }}
          />
          <VictoryAxis
            style={{
              tickLabels: {
                fontFamily: 'Roboto Mono',
                fontSize: '10px',
                angle: -45,
              },
            }}
            fixLabelOverlap={true}
          />
          <VictoryAxis
            style={{
              tickLabels: { fontFamily: 'Roboto Mono', fontSize: '10px' },
            }}
            dependentAxis
            // fixLabelOverlap
          />
        </VictoryChart>
      </div>
    );
  }
};

export default StateData;
