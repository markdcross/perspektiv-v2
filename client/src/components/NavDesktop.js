import React from "react";
import ReactRoundedImage from "react-rounded-image";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
 import { Button } from 'semantic-ui-react';

export default function NavDesktop() {

    return (
        <div>
            <Row>
                <Col className="pt-2">
                    <Image className="w-100" src="./assets/images/logo/plogo.png" />
                </Col>
                <Col className="text-right pt-2">
                    <Button content='LOGIN' basic/>
                </Col>
            </Row>
            <Row className="respLogin">
                <Col className="d-flex justify-content-center my-2">
                    <ReactRoundedImage
                        image="./assets/images/avatars/matthew.png"
                        roundedColor="#ffffff"
                        roundedSize="2"
                        imageWidth="100"
                        imageHeight="100"
                        />
                    {/* <Image src="./assets/images/avatars/matthew.png" /> */}
                    {/* </Col>
                    <Col sm={6} className="my-auto"> */}
                    <Button className="achievementMark my-auto ml-1" color='yellow' >Tesdfgsdfgsergsergsergt
                        <div className="achievementMarkCount"><p className="achievementMarkText">999</p></div>
                    </Button>
                </Col>
            </Row>
        </div>
    );
}