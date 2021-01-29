import React, { useState } from "react";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Button, Rating } from 'semantic-ui-react';
import RestaurantUserContent from "./RestaurantUserContent";
import DistanceButton from './DistanceButton';


export default function MuralContent(props) {

    const [pageInd, setPageInd] = useState(true);

    const setMNav = props.setDesktopMNav;
    setMNav(true);


    return (
        <Row className="pt-2 bigScroll">
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
                        <Image className="img-fluid w-100" src="https://doc-0k-64-mymaps.googleusercontent.com/untrusted/hostedimage/eu6g64mterdev2kl51im39lbvg/f4nabjcl8v0egsiv4ullr9joh4/1601130498500/YG7sw_Ardp6TjVMKCDnPrtHYy_GrqAdf/10485590891576421370/5AF2TALqMMHmxczgGZTXbnmaaI67mpGtBpNh083O7OMBQYZd3rh15H4vXgsHpKFrQ16N15NR5tr61Ndz-YM6rKJWN8F7npV5kS5eaYMnwPM8GNvApwn_Xw3hU_sFuxMsH-WkxIhv4Iw78ECVZ92pd9WUYTGU7fKcIG-iwsdonh65hAHNcbJ9FKQxI20bz-rNDiwNiYNXQnJhTokokhIs-Nm889i3_9qrwHAh5Xo2XlozR9JsV3NVrZHKH4aOqjZL7WVEe6I0D8Gm3uab0d9HBtZlMH58nROQ7Iw?session=0&fife"/>
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
                        <Rating icon='star' defaultRating={3} maxRating={4} />  
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p>RESTAURANT: {"{restname}"} Stalin's Steaks</p>
                        <p>TYPE: {"{resttype}"} Oppressive Flavor</p>
                        <p>ADDRESS: {"{restaddress}"} 2152 Mass Grave Way</p>
                        <p>NUMBER: {"{restnumber}"} +49 1-888-DASVIDANIYA</p>
                    </Col>
                </Row>
                <Row  className="h-100 w-100 mx-0">
                    <Col className="p-0">
                        <RestaurantUserContent />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}
