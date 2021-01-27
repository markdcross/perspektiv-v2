
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import ReactRoundedImage from "react-rounded-image";
import { AutoSizer } from 'react-virtualized';
import * as muralData from "../data/murals.json";

export default function Mapbucket() {
  const [viewport, setViewport] = useState({
    latitude: 37.541290,
    longitude: -77.434769,
    // width: "100%",
    // height: "100vh",
    zoom: 12
  });

  const [selectedMural, setSelectedMural] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setSelectedMural(null);
            }
        };

        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
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
        {muralData.features.map(murals => (
          <Marker
            key={parseInt(murals.ExtendedData.Data[0].value)}
            latitude={murals.latitude}
            longitude={murals.longitude}
          >
            <button
              className="marker-btn zoom"
              onClick={e => {
                e.preventDefault();
                setSelectedMural(murals);
              }}
            >

              {murals.ExtendedData.Data.map((img, i) => {
                if (i === 6) {
                  return (
                  <div className="rounder" key={i}                              
                  >
                    <ReactRoundedImage
                      image={img.value.__cdata}
                      roundedColor="#ffffff"
                      roundedSize="3"
                      imageWidth="40"
                      imageHeight="40"
                    />
                  </div>
                  );
                }
              }
              )}
              
            </button>
          </Marker>
        ))}

        {selectedMural ? (
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
        ) : null}
      </ReactMapGL>
          )}
    </AutoSizer>
  );
}
