import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
import ReactRoundedImage from "react-rounded-image";
import { AutoSizer } from "react-virtualized";
import MuralContext from "../context/MuralContext";
import PolylineOverlay from "./PolyLineOverlay";
import DirectionsContext from "../context/DirectionsContext";
import LocationContext from "../context/LocationContext";
import { Image } from "react-bootstrap";

// react-map-gl production deployment fix
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

export default function Mapbucket() {
	//plot point data for walking directions
	const directionsContext = useContext(DirectionsContext);
	const { directions } = directionsContext;

	const { latitude, longitude } = useContext(LocationContext);

	const muralState = useContext(MuralContext);

	const [viewport, setViewport] = useState({
		latitude: 37.54129,
		longitude: -77.434769,
		zoom: 12,
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
					onViewportChange={(viewport) => {
						setViewport(viewport);
					}}
				>
					{!muralState.data ? (
						<div>Loading...</div>
					) : (
						<div>
							{muralState.data.data.map((mural) => {
								return (
									<div key={mural.id}>
										<Marker
											key={mural.id}
											latitude={mural.location.coordinates[1]}
											longitude={mural.location.coordinates[0]}
											className='markerZ'
										>
											<button roundedCircle
												className='marker-btn zoom'
												onClick={(e) => {
													e.preventDefault();
												}}
											>
												<Link to={"/murals/" + mural.id}>
													<div roundedCircle className='rounder roundedCircle' >
													<Image src={`../../muralImagesRound/ROUND_${mural.imageFile.toLowerCase()}`} roundedCircle />
														{/* <ReactRoundedImage
															image={`../../muralImages/${mural.imageFile}`}
															roundedColor='#ffffff'
															roundedSize='3'
															imageWidth='40'
															imageHeight='40'
														/> */}
													</div>
												</Link>
											</button>
										</Marker>
									</div>
								);
							})}
						</div>
					)}
					{latitude && (
						<Marker latitude={latitude} longitude={longitude}>
							<Image src='/assets/images/logo/PinDrip3.png' width='25px' />
						</Marker>
					)}
					{/* <PolylineOverlay points={[[-76.432938, 37.538876], [-77.4347, 37.539917], [-77.452538, 37.550621]]}/> */}
					<PolylineOverlay points={directions} />
				</ReactMapGL>
			)}
		</AutoSizer>
	);
}
