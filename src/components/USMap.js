import React, { useState, useEffect, Fragment } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';

const mapboxAccessToken =
  'pk.eyJ1IjoibWljaGFlbHlvbmttYW4iLCJhIjoiY2szNHgwZHVjMDEycTNjcXJuYmNwY3Q3cCJ9.mOSuS8bMDvD6C-Omiaqk3Q';

// var mapboxAccessToken = {your access token here};
// var map = L.map('map').setView([37.8, -96], 4);

// L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=' + mapboxAccessToken, {
//     id: 'mapbox/light-v9',
//     attribution: ...,
//     tileSize: 512,
//     zoomOffset: -1
// }).addTo(map);

// L.geoJson(statesData).addTo(map);

const USMap = ({ states }) => {
  // const doFetch = async () => {
  //   let response = await fetch(
  //     'https://api.covidtracking.com/v1/states/current.json'
  //   );
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   } else {
  //     //console.log(response);
  //     let json = await response.json();
  //     console.log(json);
  //     const formattedData = json.map((state) => {
  //       const container = {};
  //       container.state = state.state;
  //       container.positiveRate =
  //         state.positiveIncrease / state.totalTestResultsIncrease;
  //       return container;
  //     });
  //     //setData(formattedData);
  //     //console.log(formattedData, json);
  //   }
  // };

  // useEffect(() => {
  //   doFetch();
  // }, []);

  const onEachState = (state, layer) => {
    layer.options.fillColor = state.properties.color;
    const name = state.properties.name;
    const positiveRate = String(state.properties.positiveRate).slice(2, 4);
    layer.bindPopup(`${name} ${positiveRate}%`);
  };

  if (states.length) {
    return (
      <Map
        center={[37.8, -96]}
        zoom={4}
        style={{ width: '50%', height: '900px' }}
      >
        <TileLayer
          attribution={
            '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        />
        <GeoJSON data={states} onEachFeature={onEachState} />
      </Map>
    );
  } else {
    return null;
  }
};

export default USMap;
