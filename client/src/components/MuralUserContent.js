import React from "react";
import ReactRoundedImage from "react-rounded-image";
import {
  Row,
  Col,
  Image
 } from 'react-bootstrap';
import { Button, Checkbox } from 'semantic-ui-react';
import * as muralData from "../data/murals.json";


export default function MuralUserContent() {

    return (
        <Row className="pt-2">
            <Col className="scrollButt">
                {muralData.features.map(murals => (
                    murals.ExtendedData.Data.map((img, i) => {
                    if (i === 6) {
                        return (
                        <>
                            <Row >
                                <Col className="parentMural">
                                    <Image className="innerMural" src={img.value.__cdata} />
                                    <Button className="achievementMarkMural px-6 py-0" color='yellow' >
                                    <p className="mb-0">Master</p>
                                    <div className="achievementMarkCountMural"><p className="achievementMarkTextMural">999</p></div>
                                    <div className="achievementMarkAvatarMural">
                                    <ReactRoundedImage
                                        image="./assets/images/avatars/matthew.png"
                                        roundedColor="#ffffff"
                                        roundedSize="0"
                                        imageWidth="25"
                                        imageHeight="25"
                                    />
                                    </div>
                                    </Button>

                                </Col>
                            </Row>
                            <Row className="pb-3">
                                <Col>
                                    <p>This is a story of a man named Jed. Poor mountaineer hardly kept his family fed. Jelly halvah croissant.</p>
                                </Col>
                            </Row>
                        </>
                        );
                        }
                    })
                ))}
            </Col>
        </Row>
    );
}
