import React, { Fragment, useContext } from 'react';
import { Button } from 'semantic-ui-react';
import getDistance from 'geolib/es/getDistance';
import LocationContext from '../utils/LocationContext';

const DistanceButton = ({ location }) => {
  // Location is an array [lng, lat]

  const { latitude, longitude } = useContext(LocationContext);

  let distance;
  if (!latitude) {
    distance = 0;
  } else {
    distance = getDistance(
      { latitude: latitude, longitude: longitude },
      { latitude: location[1], longitude: location[0] }
    );
  }

  // console.log(distance);

  return (
    <Fragment>
      <Button
        size='mini'
        color='yellow'
        content='Distance'
        icon='location arrow'
        label={{
          basic: true,
          color: 'yellow',
          pointing: 'left',
          content: distance
        }}
      />
    </Fragment>
  );
};

export default DistanceButton;
