import React, { useEffect, useState } from 'react';
import ReactRoundedImage from "react-rounded-image";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
import { Button, Rating } from 'semantic-ui-react';
import restaurantsAPI from '../utils/restaurants-API';


export default function RestaurantList() {
    const [restaurantListState, setRestaurantListState] = useState([]);

    useEffect(() => {
      restaurantsAPI.getRestaurants().then((data) => {
        setRestaurantListState(data);
        console.log(data);
      });
    }, []);
  

    return (
        <Row className="pt-2">
            {!restaurantListState.data ? (
            <div>Loading...</div>
            ) : (
            <Col className="scrollButt">
           {restaurantListState.data.data.map((restaurant) => {
            return (
                        <div>
                            <Row >
                                <Col className="parentRestaurant">
                                    <Image className="innerRestaurant" src={restaurant.image} />
                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col className="text-left">
                                    <p>{restaurant.name}</p>
                                </Col>
                                <Col className="text-right">
                                    <Rating icon='star' defaultRating={3} maxRating={4} />
                                </Col>
                            </Row>
                        </div>
                    );
                })}
            </Col>
            )}
        </Row>
    );
}
