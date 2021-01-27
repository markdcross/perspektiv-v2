import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
import { Image as SemImage, Button, Checkbox, Dimmer, Loader, Segment } from 'semantic-ui-react';
// import * as muralData from "../data/murals.json";
import API from "../utils/API";


export default function ScrollContent() {

const [muralState, setMuralState] = useState([]);

useEffect(() => {
    API.getMurals().then((data) => {
        setMuralState(data);
        console.log(data);
    });
},[]);

console.log(muralState);
return (
    <Row>
            {!muralState.data ? <div>Loading...</div> : 
            <Col className="scrollButt">
                {muralState.data.data.map(mural => {
                    // murals.ExtendedData.Data.map((img, i) => {
                    // if (i === 6) {
                        return (
                        <div>
                            <Row className="sideImgBox">
                            <Col className="p-0 parent">
                                <Image className="img-fluid w-100 inner" src={mural.image}/>
                            </Col>
                            </Row>
                            <Row className="mb-4 pt-1">
                            <Col xs={2} className="my-auto">
                                <Checkbox label='VISITED' />
                            </Col>
                            <Col xs={5} className="text-right">
                                <Button
                                size='mini'
                                color='yellow'
                                content='Distance'
                                icon='location arrow'
                                label={{ basic: true, color: 'yellow', pointing: 'left', content: '2,048' }}
                                />
                            </Col>
                            <Col xs={5} className="text-right">
                                <Button
                                size='mini'
                                color='gray'
                                content='Visits'
                                icon='street view'
                                label={{
                                    as: 'a',
                                    basic: true,
                                    color: 'gray',
                                    pointing: 'left',
                                    content: '2,048',
                                }}
                                />
                            </Col>
                            </Row>
                        </div>
                        );
                        // }
                    // })
                })}
            </Col>
            }
        </Row>
    );
}