import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker } from 'react-map-gl';
import ReactRoundedImage from 'react-rounded-image';
import { AutoSizer } from 'react-virtualized';
import MuralContext from '../context/MuralContext';

export default function Mapbucket() {
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
          mapStyle='mapbox://styles/bertodemus/ckk646sei0ckx18rsoakbi03j'
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
        </ReactMapGL>
      )}
    </AutoSizer>
  );
}
