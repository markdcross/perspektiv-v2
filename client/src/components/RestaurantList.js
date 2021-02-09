import React, { useEffect, useState } from 'react';
import { Row, Col, Image } from 'react-bootstrap';
import { Rating } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import restaurantsAPI from '../utils/restaurants-API';

export default function RestaurantList(props) {
  const [restaurantListState, setRestaurantListState] = useState([]);
  let km = 0.804672;
  let centerPoint = {
    lng: props.muralPoint.data.location.coordinates[0],
    lat: props.muralPoint.data.location.coordinates[1]
  };

  const radiusCheck = (restLng, restLat, centerPoint, km) => {
    let ky = 40000 / 360;
    let kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    let dx = Math.abs(centerPoint.lng - restLng) * kx;
    let dy = Math.abs(centerPoint.lat - restLat) * ky;
    return Math.sqrt(dx * dx + dy * dy) <= km;
  };

  useEffect(() => {
    restaurantsAPI.getRestaurants().then(data => {
      setRestaurantListState(data);
      if (data) {
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Row className='pt-2'>
      {!restaurantListState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className='scrollButt'>
          {restaurantListState.data.data.map(restaurant => {
            if (
              radiusCheck(
                restaurant.location.coordinates[0],
                restaurant.location.coordinates[1],
                centerPoint,
                km
              ) === true
            ) {
              return (
                <div key={restaurant._id}>
                  <Row>
                    <Col className='parentRestaurant'>
                      <Link to={'/restaurants/' + restaurant._id}>
                        <Image
                          className='innerRestaurant'
                          src={`../../restaurantImages/${restaurant.imageFile}`}
                        />
                      </Link>
                    </Col>
                  </Row>
                  <Row className='pb-3'>
                    <Col className='text-left'>
                      <p>{restaurant.name}</p>
                    </Col>
                    <Col className='text-right'>
                      <Rating icon='star' defaultRating={3} maxRating={4} />
                    </Col>
                  </Row>
                </div>
              );
            }
          })}
        </Col>
      )}
    </Row>
  );
}
