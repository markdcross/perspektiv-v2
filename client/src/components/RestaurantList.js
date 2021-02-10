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
        console.log(restaurantListState);
      }
    });
    // eslint-disable-next-line
  }, []);
  console.log(props.muralPoint.data.location.coordinates[0]);
  console.log(props.muralPoint.data.location.coordinates[1]);
  //  console.log(centerPoint);
  // console.log(radiusCheck(-77.47872,37.552485,centerPoint,km));

  return (
    <Row className='pt-2'>
      {!restaurantListState.data ? (
        <div>Loading...</div>
      ) : (
        <Col className='scrollButt'>
          {/* eslint-disable-next-line */}
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
                          className='innerRestaurant img-fluid w-100'
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
                      <Rating
                        icon='star'
                        defaultRating={restaurant.rating}
                        maxRating={5}
                        className='ml-1'
                      />
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
