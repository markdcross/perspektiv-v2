import React from "react";
import ReactRoundedImage from "react-rounded-image";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
 import { Button } from 'semantic-ui-react';

export default function NavDesktopM() {
    return (
        <Row className="fbNav">
            <Col className="pt-2">
                <Image className="w-100" src="/assets/images/logo/plogo.png" />
            </Col>
            <Col className="my-2 respLoginBreakDN fluid">
                <Button content="Tesdfgsdfg" className="achievementMark px-6 w-100 clearfix" color='yellow' >
                    Master
                    <div className="achievementMarkCountDN"><p className="achievementMarkTextDN">999</p></div>
                    <div className="achievementMarkAvatarDN">
                        <ReactRoundedImage
                            image="/assets/images/avatars/matthew.png"
                            roundedColor="#ffffff"
                            roundedSize="0"
                            imageWidth="40"
                            imageHeight="40"
                        />
                    </div>
                </Button>
            </Col>
            <Col className="text-right pt-2">
                <Button content='LOGIN' basic/>
            </Col>
        </Row>
    );
}