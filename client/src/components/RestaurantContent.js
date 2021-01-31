import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";
import { Button, Rating } from 'semantic-ui-react';
import restaurantsAPI from '../utils/restaurants-API';

import RestaurantUserContent from "./RestaurantUserContent";
import DistanceButton from './DistanceButton';


export default function RestaurantContent(props) {

    // const [pageInd, setPageInd] = useState(true);
    const { restId } = useParams();

    const [restaurantState, setRestaurantState] = useState([]);

    useEffect(() => {
      restaurantsAPI.getRestaurant(restId).then((data) => {
        setRestaurantState(data);
        console.log(data);
      });
    }, []);

    const setMNav = props.setDesktopMNav;
    setMNav(true);


    return (
        <Row className="pt-2 bigScroll">
            {!restaurantState.data ? (
                <div>Loading...</div>
            ) : (
            <Col>
                <Row>
                    <Col className="pb-2">
                        <Link to="/murals"><Button content='Back'/></Link>
                    </Col>
                    <Col className="text-right pb-2">
                        <Button content='Post Photo' color="yellow"/>
                    </Col>
                </Row>
                <Row className="sideImgBox">
                    <Col className="p-0">
                        <Image className="img-fluid w-100" src={restaurantState.data.data.image}/>
                        {/* <Image className="img-fluid w-100 inner" src={props.image}/> */}
                    </Col>
                </Row>
                <Row className="mb-4 pt-1">
                    <Col xs={6} className="text-left">
                        <Button
                        size='mini'
                        color='yellow'
                        content='Distance'
                        icon='location arrow'
                        label={{ basic: true, color: 'yellow', pointing: 'left', content: '2,048' }}
                        />
                    </Col>
                    <Col xs={6} className="text-right">
                        <Rating icon='star' defaultRating={restaurantState.data.data.rating} maxRating={5} />  
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>RESTAURANT: {restaurantState.data.data.name}</p>
                        <p>CATEGORY: {restaurantState.data.data.category}</p>
                        <p>ADDRESS: {restaurantState.data.data.address} </p>
                        <p>PRICE:{!restaurantState.data.data.price ? ("----") : (restaurantState.data.data.price)}</p>
                    </Col>
                </Row>
                <Row  className="h-100 w-100 mx-0">
                    <Col className="p-0">
                        <RestaurantUserContent />
                    </Col>
                </Row>
            </Col>
            )}
        </Row>
    );
}
