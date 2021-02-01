import React from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Image } from 'react-bootstrap';
import { Button, Progress } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export default function NavDesktop() {
  return (
    <div>
      <Row>
        <Col className="pt-2">
          <Link to={'/'}>
            <Image className="w-100" src="/assets/images/logo/plogo.png" />
          </Link>
        </Col>
        <Col className="text-right pt-2">
          <Link to="/login">
            <Button content="LOGIN" basic />
          </Link>
        </Col>
      </Row>
      <Row className="respLogin">
        <Col className="d-flex justify-content-center my-2">
          <ReactRoundedImage
            image="/assets/images/avatars/matthew.png"
            roundedColor="#ffffff"
            roundedSize="2"
            imageWidth="100"
            imageHeight="100"
          />
          <Button className="achievementMark my-auto ml-1" color="yellow">
            Explorer
            <div className="achievementMarkCount">
              <p className="achievementMarkText">42</p>
            </div>
          </Button>
        </Col>
      </Row>
      <Row className="pb-2">
        <Col>
          <Progress
            progress="value"
            value={3}
            total={10}
            active
            color="pink"
            size="small"
          />
        </Col>
      </Row>
    </div>
  );
}
