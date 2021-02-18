import React, { Fragment, useContext } from 'react';
import { Button } from 'semantic-ui-react';
import getDistance from 'geolib/es/getDistance';
import LocationContext from '../context/LocationContext';
import getDirections from '../utils/getDirections';
import DirectionsContext from '../context/DirectionsContext';

const DistanceButton = ({ location, id }) => {
  // Location is an array [lng, lat]

  const { latitude, longitude } = useContext(LocationContext);

  const muralLatitude = location[1];
  const muralLongitude = location[0];

  let distance;
  if (!latitude) {
    distance = 0;
  } else {
    distance = getDistance(
      { latitude: latitude, longitude: longitude },
      { latitude: muralLatitude, longitude: muralLongitude }
    );
  }

    //setting the plot points
    // const { directionsValue } = useContext(DirectionsContext);
    // const [ directionsState, setDirectionsState ] = directionsValue;

    const directionsContext = useContext(DirectionsContext);
    const {
      plotCall
    } = directionsContext;

    let plotPoints = null;
    // const { plotValue } = useContext(DirectionsContext);
    // const [ plotCall ] = plotValue;

  const onClick = () => {
    getDirections
      .getDirections(latitude, longitude, muralLatitude, muralLongitude)
      .then(directions => {
        console.log(
          '🚀 ~ file: DistanceButton.js ~ line 44 ~ muralsAPI.getDirections ~ directions',
          directions.data
        );

        if (directions.data) {
          plotPoints = directions.data.route.legs[0].maneuvers.map(points => 
          [points.startPoint.lng,points.startPoint.lat]
          )
          plotCall(plotPoints);
          // console.log(plotPoints);
          // setDirectionsState(plotPoints);
          // console.log(directionsState);
        }
        // plotPoints = directions.data.route.legs[0].maneuvers.map(points => 
        //   [points.startPoint.lng,points.startPoint.lat]
        // )
        // console.log(plotPoints);
      });
  };
  
  return (
    <Fragment>
      <Button
        size='mini'
        color='yellow'
        content='  '
        icon='location arrow'
        label={{
          basic: true,
          color: 'yellow',
          pointing: 'left',
          content: `${distance}m`
        }}
        onClick={onClick}
        className="ml-1 pl-2 pr-2"
      />
    </Fragment>
  );
};

export default DistanceButton;
