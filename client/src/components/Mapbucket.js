import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import ReactRoundedImage from 'react-rounded-image';
import { AutoSizer } from 'react-virtualized';
// import * as muralData from '../data/murals.json';
import MuralContext from '../context/MuralContext';

export default function Mapbucket() {
  const muralState = useContext(MuralContext);

  const [viewport, setViewport] = useState({
    latitude: 37.54129,
    longitude: -77.434769,
    // width: "100%",
    // height: "100vh",
    zoom: 12
  });

  const [selectedMural, setSelectedMural] = useState(null);

  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedMural(null);
      }
    };

    window.addEventListener('keydown', listener);

    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <AutoSizer>
      {({ height, width }) => (
        <ReactMapGL
          {...viewport}
          width={width}
          height={height}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
          // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
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
                    >
                      <button
                        className='marker-btn zoom'
                        onClick={e => {
                          e.preventDefault();
                          console.log('clickit or ticket');
                          // setSelectedMural(murals);
                        }}
                      >
                        {/* {murals.ExtendedData.Data.map((img, i) => {
                          if (i === 6) {
                            return ( */}
                        <Link to={'/murals/' + mural.id}>
                          <div className='rounder'>
                            <ReactRoundedImage
                              image={`../../../muralImages/${mural.imageFile}`}
                              roundedColor='#ffffff'
                              roundedSize='3'
                              imageWidth='40'
                              imageHeight='40'
                            />
                          </div>
                        </Link>
                        {/* //     );
                        //   }
                        // })} */}
                      </button>
                    </Marker>

                    {/* {selectedMural ? (
                    <Popup
                      latitude={selectedMural.latitude}
                      longitude={selectedMural.longitude}
                      onClose={() => {
                        setSelectedMural(null);
                      }}
                    >
                      <div>
                        <h2>{selectedMural.name}</h2>
                        <p>{selectedMural.ExtendedData.Data[2].value}</p>
                      </div>
                    </Popup>
                  ) : null} */}
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
