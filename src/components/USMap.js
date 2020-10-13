import React, { useState, useEffect, Fragment } from 'react';
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import Leaflet from 'leaflet';
import Legend from './Legend';
import legendItems from '../entities/LegendItems';

const LegendItemsInReverse = [...legendItems].reverse();

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

  const mapStyle = {
    fillColor: 'white',
    weight: 1,
    color: 'black',
    fillOpacity: 1,
  };

  const onEachState = (state, layer) => {
    layer.options.fillColor = state.properties.color;
    const name = state.properties.name;
    const positiveRate = state.properties.positiveRate;
    layer.bindPopup(`${name} ${positiveRate}%`);
  };

  const corner1 = Leaflet.latLng(0, -190);
  const corner2 = Leaflet.latLng(72, -50);
  const bounds = Leaflet.latLngBounds(corner1, corner2);

  return (
    <div className="map-legend-container">
      <Legend legendItems={LegendItemsInReverse} />
      <Map
        center={[37.8, -96]}
        zoom={3.5}
        minZoom={3}
        maxZoom={4}
        style={{ width: '100%', height: '900px' }}
        maxBoundsViscosity={1.0}
        maxBounds={bounds}
      >
        {/* <TileLayer
          attribution={
            '&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=${mapboxAccessToken}`}
        /> */}
        <GeoJSON style={mapStyle} data={states} onEachFeature={onEachState} />
      </Map>
    </div>
  );
};

export default USMap;
