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
        .slice(0, 8)
        .reverse()
        .map((day) => {
          const container = {};
          container.date = new Date(day.lastUpdateEt).toLocaleDateString();
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
    console.log(data);
    return (
      <Fragment>
        <h1>New Cases</h1>
        <VictoryChart
          fixLabelOverlap={true}
          theme={VictoryTheme.material}
          domainPadding={20}
        >
          <VictoryBar
            data={data}
            labels={({ datum }) =>
              `Date: ${datum.date} New cases: ${datum.positiveIncrease}`
            }
            labelComponent={<VictoryTooltip constrainToVisibleArea />}
            x="date"
            y="positiveIncrease"
            style={{
              data: { fill: 'tomato', width: 20 },
            }}
          />
          <VictoryAxis fixLabelOverlap />
          <VictoryAxis dependentAxis />
        </VictoryChart>
      </Fragment>
    );
  }
};

export default StateData;
