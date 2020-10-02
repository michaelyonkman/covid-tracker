import LegendItem from './LegendItem';

const legendItems = [
  new LegendItem('20+%', '#741f1f', (cases) => cases >= 20, 'white'),
  new LegendItem(
    '15-20%',
    '#9c2929',
    (cases) => cases >= 15 && cases < 20,
    'white'
  ),
  new LegendItem('10-15%', '#c57f7f', (cases) => cases >= 10 && cases < 15),
  new LegendItem('5-10%', '#d8aaaa', (cases) => cases >= 5 && cases < 10),
  new LegendItem('0-5%', '#ebd4d4', (cases) => cases >= 0 && cases < 5),
  new LegendItem('No Data', '#ffffff', (cases) => true),
];

export default legendItems;
