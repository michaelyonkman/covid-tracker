import { features } from '../data/states.json';
import legendItems from '../entities/LegendItems';

const state_hash = {
  AL: 'Alabama',
  AK: 'Alaska',
  AS: 'American Samoa',
  AZ: 'Arizona',
  AR: 'Arkansas',
  CA: 'California',
  CO: 'Colorado',
  CT: 'Connecticut',
  DE: 'Delaware',
  DC: 'District Of Columbia',
  FM: 'Federated States Of Micronesia',
  FL: 'Florida',
  GA: 'Georgia',
  GU: 'Guam',
  HI: 'Hawaii',
  ID: 'Idaho',
  IL: 'Illinois',
  IN: 'Indiana',
  IA: 'Iowa',
  KS: 'Kansas',
  KY: 'Kentucky',
  LA: 'Louisiana',
  ME: 'Maine',
  MH: 'Marshall Islands',
  MD: 'Maryland',
  MA: 'Massachusetts',
  MI: 'Michigan',
  MN: 'Minnesota',
  MS: 'Mississippi',
  MO: 'Missouri',
  MT: 'Montana',
  NE: 'Nebraska',
  NV: 'Nevada',
  NH: 'New Hampshire',
  NJ: 'New Jersey',
  NM: 'New Mexico',
  NY: 'New York',
  NC: 'North Carolina',
  ND: 'North Dakota',
  MP: 'Northern Mariana Islands',
  OH: 'Ohio',
  OK: 'Oklahoma',
  OR: 'Oregon',
  PW: 'Palau',
  PA: 'Pennsylvania',
  PR: 'Puerto Rico',
  RI: 'Rhode Island',
  SC: 'South Carolina',
  SD: 'South Dakota',
  TN: 'Tennessee',
  TX: 'Texas',
  UT: 'Utah',
  VT: 'Vermont',
  VI: 'Virgin Islands',
  VA: 'Virginia',
  WA: 'Washington',
  WV: 'West Virginia',
  WI: 'Wisconsin',
  WY: 'Wyoming',
};

class LoadStatesTask {
  doFetch = async () => {
    let covidData = {};
    let response = await fetch(
      'https://api.covidtracking.com/v1/states/current.json'
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      let json = await response.json();

      for (let i = 0; i < json.length; i++) {
        let state = json[i];
        let positiveRate = Math.ceil(
          (state.positiveIncrease / state.totalTestResultsIncrease) * 100
        );
        covidData[state_hash[state.state]] = positiveRate;
      }
    }
    return covidData;
  };

  load = async (setState) => {
    let covidData = await this.doFetch();
    for (let i = 0; i < features.length; i++) {
      let state = features[i];
      state.properties.positiveRate = covidData[state.properties.name];
      let legendItem = legendItems.find((legendItem) =>
        legendItem.isFor(state.properties.positiveRate)
      );
      state.properties.color = legendItem.color;
    }
    console.log('IN LOAD', features);
    setState(features);
  };
}

export default LoadStatesTask;
