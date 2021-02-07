import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import ReactRoundedImage from 'react-rounded-image';
import { AutoSizer } from 'react-virtualized';
import MuralContext from '../context/MuralContext';
import PolylineOverlay from './PolyLineOverlay';
import DirectionsContext from '../context/DirectionsContext';

// react-map-gl production deployment fix
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

export default function Mapbucket() {
  //plot point data for walking directions
  const { directionsValue } = useContext(DirectionsContext);
  const [ directionsState ] = directionsValue;
  // let [ plotPoints ] = plotValue;
  // console.log(plotPoints);

  const muralState = useContext(MuralContext);

  const [viewport, setViewport] = useState({
    latitude: 37.54129,
    longitude: -77.434769,
    zoom: 12
  });

  return (
    <AutoSizer>
      {({ height, width }) => (
        <ReactMapGL
          {...viewport}
          width={width}
          height={height}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          mapStyle='mapbox://styles/bertodemus/ckkvdq41s255c17phfrsay0t1'
          onViewportChange={viewport => {
            setViewport(viewport);
          }}
        >
          {!muralState.data ? (
            <div>Loading...</div>
          ) : (
            <div>
              {muralState.data.data.map(mural => {
                return (
                  <div key={mural.id}>
                    <Marker
                      key={mural.id}
                      latitude={mural.location.coordinates[1]}
                      longitude={mural.location.coordinates[0]}
                      className='markerZ'
                    >
                      <button
                        className='marker-btn zoom'
                        onClick={e => {
                          e.preventDefault();
                        }}
                      >
                        <Link to={'/murals/' + mural.id}>
                          <div className='rounder'>
                            <ReactRoundedImage
                              image={`../../muralImages/${mural.imageFile}`}
                              roundedColor='#ffffff'
                              roundedSize='3'
                              imageWidth='40'
                              imageHeight='40'
                            />
                          </div>
                        </Link>
                      </button>
                    </Marker>
                  </div>
                );
              })}
            </div>
          )}
        {/* <PolylineOverlay points={[[-76.432938, 37.538876], [-77.4347, 37.539917], [-77.452538, 37.550621]]}/> */}
        <PolylineOverlay points={directionsState}/>
        </ReactMapGL>
      )}
    </AutoSizer>
  );
}
